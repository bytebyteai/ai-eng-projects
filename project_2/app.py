import streamlit as st
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.llms import Ollama
from langchain.chains import ConversationalRetrievalChain
from datetime import datetime

# Make sure you have already defined `chain` in this notebook or imported it

st.title("📄 Customer Support Chatbot (RAG)")

@st.cache_resource
def load_vectorstore():
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectordb = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    return vectordb

@st.cache_resource
def load_llm():
    return Ollama(model="gemma3:1b", temperature=0.1)

vectordb = load_vectorstore()
retriever = vectordb.as_retriever(search_kwargs={"k": 3})
llm = load_llm()

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

if "chat_timestamps" not in st.session_state:
    st.session_state.chat_timestamps = []
    
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

user_input = st.text_input("Ask a question about your documents:")
if st.button("Send") and user_input:
    answer = chain.run({
        "question": user_input,
        "chat_history": st.session_state.chat_history
    })
    st.session_state.chat_history.append((user_input, answer))
    st.session_state.chat_timestamps.append(datetime.now())
    
combined = list(zip(st.session_state.chat_history, st.session_state.chat_timestamps))

# Display newest first
for (q, a), ts in sorted(combined, key=lambda x: x[1], reverse=True):
    st.markdown(f"🕓 *{ts.strftime('%Y-%m-%d %H:%M:%S')}*")
    st.markdown(f"**Q:** {q}")
    st.markdown(f"**A:** {a}")
    st.markdown("---")