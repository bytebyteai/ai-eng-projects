import React, { useState } from "react";
import axios from "axios";
import "./ChatWidget.css"; // optional CSS

const API_URL = "http://localhost:8000/chat"; // your FastAPI endpoint

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        question: input,
        history: messages.map((m) => [m.role, m.content]),
      });

      const botMessage = {
        role: "bot",
        content: response.data.answer,
      };

      setMessages((prev) => [...prev, botMessage]);
      setInput("");
    } catch (error) {
      console.error("API error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "⚠️ Could not get answer from API." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-widget-container">
      <button className="chat-toggle-btn" onClick={toggleOpen}>
        💬
      </button>

      {open && (
        <div className="chat-popup">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "chat-message user" : "chat-message bot"}
              >
                {m.content}
              </div>
            ))}
            {loading && <div className="chat-message bot">Typing...</div>}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask a question..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
