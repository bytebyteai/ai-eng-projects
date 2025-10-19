# backend/app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from langchain_community.chat_models import ChatOllama
from langchain.agents import initialize_agent, Tool, AgentType
from duckduckgo_search import DDGS
from langchain.tools import tool

# ----------------------------TOOLS------------------------------------
def search_web(query: str, max_results: int = 10) -> str:
    """Return the top `max_results` web results for `query` as a single
    formatted string. Uses DuckDuckGo's unofficial API."""
    results = []
    with DDGS() as ddgs:
        for r in ddgs.text(query, max_results=max_results):
            results.append(f"- {r['title']} — {r['href']}")
    return "\n".join(results)


@tool
def web_search(query: str) -> str:
    """Search the web for `query` and return concise results"""
    return search_web(query)

# Add other tools here (e.g., a dummy get_current_weather)
# @tool
# def get_current_weather(city: str, unit: str = "celsius") -> str:
#     """Get the current weather for a city (unit may be celsius or fahrenheit)"""
#     return f"It is 23°{unit[0].upper()} and sunny in {city}."

# ----------------------------AGENT------------------------------------

llm = ChatOllama(model="llama3", temperature=0)
tools = [web_search]
agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
)
# ----------------------------------FASTAPI------------------------------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class AskRequest(BaseModel):
    question: str

@app.post("/ask")
async def ask(req: AskRequest):
    """Proxy the question to the LangChain agent and return its answer."""
    result = agent.invoke({"input": req.question})
    return {"answer": result["output"]}
