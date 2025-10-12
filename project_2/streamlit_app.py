# app.py
import streamlit as st
import requests
from datetime import datetime

st.title("📄 Customer Support Chatbot (RAG via FastAPI)")

API_URL = "http://localhost:8000/chat"  # Your FastAPI endpoint

# Initialize session state
if "chat_timestamps" not in st.session_state:
    st.session_state.chat_timestamps = []
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

user_input = st.text_input("Ask a question about your documents:")

if st.button("Send") and user_input:
    try:
        payload = {
            "question": user_input,
            "history": st.session_state.chat_history
        }
        response = requests.post(API_URL, json=payload)
        if response.status_code == 200:
            answer = response.json().get("answer", "No answer received.")
        else:
            answer = f"❌ Error: {response.text}"
    except Exception as e:
        answer = f"⚠️ Could not connect to API: {e}"

    # Save chat to session
    st.session_state.chat_history.append((user_input, answer))
    st.session_state.chat_timestamps.append(datetime.now())

# Show conversation (newest first)
combined = list(zip(st.session_state.chat_history, st.session_state.chat_timestamps))
for (q, a), ts in sorted(combined, key=lambda x: x[1], reverse=True):
    st.markdown(f"🕓 *{ts.strftime('%Y-%m-%d %H:%M:%S')}*")
    st.markdown(f"**Q:** {q}")
    st.markdown(f"**A:** {a}")
    st.markdown("---")
