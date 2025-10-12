import React, { useState } from "react";
import axios from "axios";
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const API_URL = "http://localhost:8232/chat"; // your FastAPI endpoint

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const formatBotResponse = (text) => {
    if (!text) return text;
    
    // Split by sentences and look for patterns that should be formatted
    const lines = text.split('. ').filter(line => line.trim());
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      // Handle refund timeline patterns
      if (trimmedLine.includes('→') || trimmedLine.includes('refund timeline') || trimmedLine.includes('refund initiates')) {
        return (
          <div key={index} className="mb-2">
            <div className="font-semibold text-gray-800 mb-2">Refund Timeline:</div>
            <div className="space-y-1 ml-2">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>Warehouse receipt → inspection ≤ 3 business days → refund initiates</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>Stripe/Apple Pay: 5-7 banking days</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>PayPal: instant</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>Shop Pay: up to 10 days</span>
              </div>
            </div>
          </div>
        );
      }
      
      // Handle return process
      if (trimmedLine.includes('start a return') || trimmedLine.includes('Refund') || trimmedLine.includes('Exchange')) {
        return (
          <div key={index} className="mb-2">
            <div className="font-semibold text-gray-800 mb-2">How to Start a Return:</div>
            <div className="space-y-1 ml-2">
              <div className="flex items-start space-x-2">
                <span className="text-green-500">•</span>
                <span>Visit everstorm.example/returns</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">•</span>
                <span>Enter order # and email</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">•</span>
                <span>Select "Refund" or "Exchange"</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500">•</span>
                <span>Print prepaid label and ship</span>
              </div>
            </div>
          </div>
        );
      }
      
      // Handle shipping information
      if (trimmedLine.includes('shipping') || trimmedLine.includes('delivery') || trimmedLine.includes('carrier')) {
        return (
          <div key={index} className="mb-2">
            <div className="font-semibold text-gray-800 mb-2">Shipping Information:</div>
            <div className="space-y-1 ml-2">
              <div className="flex items-start space-x-2">
                <span className="text-purple-500">•</span>
                <span>Free shipping on orders $75+ to US, Canada, EU</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-purple-500">•</span>
                <span>Same-day dispatch for orders before 2PM</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-purple-500">•</span>
                <span>Global delivery to 8+ countries</span>
              </div>
            </div>
          </div>
        );
      }
      
      // Regular text with proper line breaks
      return (
        <div key={index} className="mb-2">
          {trimmedLine}
          {index < lines.length - 1 ? '' : ''}
        </div>
      );
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        question: input,
        history: messages.map((m) => [m.role, m.content]),
      });

      const botMessage = {
        role: "bot",
        content: response.data.answer,
        formatted: formatBotResponse(response.data.answer)
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API error:", error);
      const errorMessage = {
        role: "bot", 
        content: "⚠️ Sorry, I'm having trouble connecting right now. Please try again later.",
        formatted: "⚠️ Sorry, I'm having trouble connecting right now. Please try again later."
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="w-[500px] h-[600px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col mb-4 animate-in slide-in-from-bottom-5 duration-300">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Everstorm Assistant</h3>
                  <p className="text-sm opacity-90">Online • Ready to help</p>
                </div>
              </div>
              <button 
                onClick={toggleOpen}
                className="hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Messages Container */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-base">Ask me about shipping, returns, payments, or product info!</p>
                <p className="text-sm text-gray-400 mt-2">I can help with refund timelines, shipping rates, and more</p>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-base ${
                    m.role === "user" 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.formatted || m.content}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-none shadow-sm p-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white rounded-b-2xl p-4">
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about shipping, returns, payments, product info..."
                className="flex-1 border border-gray-300 rounded-full px-5 py-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Floating Chat Button */}
      <button
        onClick={toggleOpen}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          open 
            ? 'bg-gradient-to-r from-red-500 to-pink-600 rotate-90' 
            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-110'
        }`}
      >
        {open ? (
          <X className="text-white w-7 h-7" />
        ) : (
          <MessageCircle className="text-white w-7 h-7" />
        )}
      </button>
    </div>
  );
}