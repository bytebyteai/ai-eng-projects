from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.llms import Ollama
from langchain.chains import ConversationalRetrievalChain
from fastapi.middleware.cors import CORSMiddleware
import time

# -------------------------------
# ✅ FastAPI setup
# -------------------------------
app = FastAPI(title="RAG Chatbot API", version="1.0")

# Optional: allow frontend/local testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# 📦 Load resources (cached)
# -------------------------------
def load_vectorstore():
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectordb = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    return vectordb

def load_llm():
    return Ollama(model="gemma3:1b", temperature=0.1)

# Initialize model & retriever once
vectordb = load_vectorstore()
retriever = vectordb.as_retriever(search_kwargs={"k": 3})
llm = load_llm()

# -------------------------------
# 💬 Define RAG chain
# -------------------------------
SYSTEM_TEMPLATE = """
You are a **Customer Support Chatbot**. Use only the information in CONTEXT to answer.
If the answer is not in CONTEXT, respond with “I'm not sure from the docs.”

Rules:
1) Use ONLY the provided <context> to answer.
2) If the answer is not in the context, say: "I don't know based on the retrieved documents."
3) Be concise and accurate. Prefer quoting key phrases from the context.

CONTEXT:
{context}

USER:
{question}
"""

prompt = PromptTemplate(template=SYSTEM_TEMPLATE, input_variables=["context", "question"])

chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    combine_docs_chain_kwargs={"prompt": prompt},
)

# -------------------------------
# 📥 Request/Response schemas
# -------------------------------
class ChatRequest(BaseModel):
    question: str
    history: list[tuple[str, str]] = []  # [(user, bot), ...]

class ChatResponse(BaseModel):
    answer: str
    sources: list[str] = []

# -------------------------------
# 🚀 Endpoints
# -------------------------------
@app.get("/")
def root():
    return {"message": "RAG Chatbot API is running."}

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    total_start = time.time()
    try:
        result = chain.invoke({"question": request.question, "chat_history": request.history})
        answer = result["answer"]
        
        # Optionally include retrieved docs as 'sources'
        sources = [doc.metadata.get("source", "unknown") for doc in result.get("source_documents", [])]
        return ChatResponse(answer=answer, sources=sources)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
