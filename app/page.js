"use client";

import { useState, useRef, useEffect } from "react";

const PERSONAS = [
  {
    name: "Anshuman Singh",
    suggestions: [
      "How do I improve my logic building in DSA?",
      "What is the most important skill for a software engineer?",
      "How did you build Scaler?",
    ],
  },
  {
    name: "Abhimanyu Saxena",
    suggestions: [
      "Why is building scalable systems so hard?",
      "What did you learn from working at Fab.com?",
      "How should I think about my long-term career in tech?",
    ],
  },
  {
    name: "Kshitij Mishra",
    suggestions: [
      "Can you explain Dynamic Programming simply?",
      "Why do students struggle with recursion?",
      "What is the best way to visualize a graph problem?",
    ],
  },
];

export default function ChatApp() {
  const [activePersona, setActivePersona] = useState(PERSONAS[0]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle switching persona
  const handlePersonaSwitch = (persona) => {
    if (isLoading) return; // Prevent switching while fetching
    setActivePersona(persona);
    setMessages([]); // Reset conversation
    setInput("");
  };

  // Handle sending a message
  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          persona: activePersona.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1>Scaler AI Personas</h1>
        <div className="persona-switcher">
          {PERSONAS.map((p) => (
            <button
              key={p.name}
              onClick={() => handlePersonaSwitch(p)}
              className={`persona-btn ${activePersona.name === p.name ? "active" : ""}`}
              disabled={isLoading}
            >
              {p.name}
            </button>
          ))}
        </div>
      </header>

      {/* Chat Feed */}
      <main className="chat-feed">
        {messages.length === 0 ? (
          <div className="message bot">
            Hi! I am {activePersona.name}. How can I help you today?
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role === "user" ? "user" : "bot"}`}>
              {msg.content}
            </div>
          ))
        )}

        {isLoading && (
          <div className="typing-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Suggestion Chips */}
      {messages.length === 0 && (
        <div className="suggestions-container">
          <div className="suggestions-title">Ask {activePersona.name} about:</div>
          <div className="chips-wrapper">
            {activePersona.suggestions.map((sug, i) => (
              <button
                key={i}
                className="chip"
                onClick={() => sendMessage(sug)}
                disabled={isLoading}
              >
                {sug}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <footer className="input-area">
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${activePersona.name}...`}
            disabled={isLoading}
          />
          <button type="submit" className="send-btn" disabled={!input.trim() || isLoading}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </footer>
    </div>
  );
}
