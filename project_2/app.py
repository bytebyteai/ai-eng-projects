import streamlit as st

# Make sure you have already defined `chain` in this notebook or imported it

st.title("📄 Customer Support Chatbot (RAG)")

# Initialize chat history in session state
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

# User input
user_input = st.text_input("Ask a question about your documents:")
source = "www.google.com"

if st.button("Send") and user_input:
    # Get answer from the RAG chain
    answer = chain.run({"question": user_input, "chat_history": st.session_state.chat_history})
    answer = chain.run({
        "question": user_input,
        "chat_history": st.session_state.chat_history,
        "source": source
    })

    # Append to chat history
    st.session_state.chat_history.append((user_input, answer))

    # Display the conversation
    for q, a in st.session_state.chat_history:
        st.markdown(f"**Q:** {q}")
        st.markdown(f"**A:** {a}")
        st.markdown("---")