"use client";

import { useState, useRef, useEffect } from "react";

const PERSONAS = [
  {
    name: "Anshuman Singh",
    role: "Co-Founder · Scaler & InterviewBit",
    initial: "AS",
    gradient: "from-blue-500 via-cyan-400 to-blue-600",
    glowColor: "rgba(59, 130, 246, 0.4)",
    accentColor: "#3b82f6",
    bgGlow: "radial-gradient(ellipse at 70% 30%, rgba(59,130,246,0.12) 0%, transparent 60%)",
    tag: "FAANG · Startups · System Design",
    suggestions: [
      "How do I break into FAANG?",
      "Is the Indian education system broken?",
      "Why did you leave Facebook to build Scaler?",
    ],
  },
  {
    name: "Abhimanyu Saxena",
    role: "Co-Founder · Scaler & InterviewBit",
    initial: "AbS",
    gradient: "from-violet-500 via-purple-400 to-pink-500",
    glowColor: "rgba(139, 92, 246, 0.4)",
    accentColor: "#8b5cf6",
    bgGlow: "radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.12) 0%, transparent 60%)",
    tag: "Leadership · Team Building · Career",
    suggestions: [
      "I feel like I started coding too late.",
      "How do you build a world-class team?",
      "I keep quitting side projects. Help.",
    ],
  },
  {
    name: "Kshitij Mishra",
    role: "Head of Instructors · Scaler Academy",
    initial: "KM",
    gradient: "from-emerald-400 via-teal-400 to-cyan-500",
    glowColor: "rgba(16, 185, 129, 0.4)",
    accentColor: "#10b981",
    bgGlow: "radial-gradient(ellipse at 70% 30%, rgba(16,185,129,0.12) 0%, transparent 60%)",
    tag: "DSA · Interviews · Salary Negotiation",
    suggestions: [
      "Explain Dynamic Programming simply.",
      "BFS vs DFS — when to use which?",
      "How do I negotiate my salary offer?",
    ],
  },
];

export default function ChatApp() {
  const [activePersona, setActivePersona] = useState(PERSONAS[0]);

  const [chatHistory, setChatHistory] = useState({
    "Anshuman Singh": [],
    "Abhimanyu Saxena": [],
    "Kshitij Mishra": [],
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const currentMessages = chatHistory[activePersona.name];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, isLoading]);

  const handlePersonaSwitch = (persona) => {
    if (isLoading) return;
    setActivePersona(persona);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const getTimestamp = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: "user", content: text, timestamp: getTimestamp() };

    setChatHistory((prev) => ({
      ...prev,
      [activePersona.name]: [...prev[activePersona.name], userMessage],
    }));

    setInput("");
    setIsLoading(true);

    try {
      const messagesToSend = [...currentMessages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesToSend, persona: activePersona.name }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong.");

      const botMessage = {
        role: "assistant",
        content: data.content,
        timestamp: getTimestamp(),
      };

      setChatHistory((prev) => ({
        ...prev,
        [activePersona.name]: [...prev[activePersona.name], botMessage],
      }));
    } catch (error) {
      setChatHistory((prev) => ({
        ...prev,
        [activePersona.name]: [
          ...prev[activePersona.name],
          {
            role: "assistant",
            content: `Something went wrong: ${error.message}`,
            timestamp: getTimestamp(),
          },
        ],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#080B14" }}
    >
      {/* Background ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-1000"
        style={{ background: activePersona.bgGlow }}
      />

      {/* ────────── SIDEBAR ────────── */}
      <aside
        className="relative z-10 w-72 shrink-0 hidden md:flex flex-col"
        style={{
          background: "rgba(12, 16, 28, 0.85)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Logo */}
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 0 16px rgba(99,102,241,0.5)",
              }}
            >
              S
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Scaler AI</span>
          </div>
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-slate-500 ml-11">
            Expert Personas
          </p>
        </div>

        <div
          className="mx-4 mb-4"
          style={{ height: "1px", background: "rgba(255,255,255,0.05)" }}
        />

        {/* Persona list */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2 custom-scrollbar">
          {PERSONAS.map((p) => {
            const isActive = activePersona.name === p.name;
            return (
              <button
                key={p.name}
                onClick={() => handlePersonaSwitch(p)}
                disabled={isLoading}
                className={`shine-hover w-full text-left px-4 py-3.5 rounded-2xl flex items-center gap-3.5 transition-all duration-300 ${
                  isActive ? "persona-active" : "hover:bg-white/5"
                }`}
                style={
                  isActive
                    ? {
                        background: `linear-gradient(135deg, ${p.accentColor}18, ${p.accentColor}08)`,
                        border: `1px solid ${p.accentColor}40`,
                      }
                    : {
                        background: "transparent",
                        border: "1px solid transparent",
                      }
                }
              >
                {/* Avatar */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm text-white shrink-0 transition-all duration-300 bg-gradient-to-br ${p.gradient}`}
                  style={
                    isActive
                      ? { boxShadow: `0 0 18px ${p.glowColor}` }
                      : {}
                  }
                >
                  {p.initial}
                </div>

                <div className="min-w-0">
                  <div
                    className="font-semibold text-sm truncate transition-colors duration-200"
                    style={{ color: isActive ? p.accentColor : "#e2e8f0" }}
                  >
                    {p.name}
                  </div>
                  <div className="text-xs text-slate-500 truncate">{p.role.split(" · ")[0]}</div>
                </div>

                {isActive && (
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background: p.accentColor,
                      boxShadow: `0 0 6px ${p.accentColor}`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar footer */}
        <div className="px-5 py-4 border-t border-white/5">
          <p className="text-[10px] text-slate-600 leading-relaxed">
            AI personas may produce inaccurate information. Verify critical advice.
          </p>
        </div>
      </aside>

      {/* ────────── MAIN AREA ────────── */}
      <main className="relative z-10 flex-1 flex flex-col overflow-hidden">

        {/* Mobile top bar */}
        <header
          className="md:hidden flex items-center gap-3 px-4 py-3 shrink-0"
          style={{
            background: "rgba(12,16,28,0.9)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${activePersona.gradient}`}
          >
            {activePersona.initial}
          </div>
          <select
            className="flex-1 bg-transparent text-sm text-white outline-none"
            value={activePersona.name}
            onChange={(e) =>
              handlePersonaSwitch(PERSONAS.find((p) => p.name === e.target.value))
            }
            disabled={isLoading}
          >
            {PERSONAS.map((p) => (
              <option key={p.name} value={p.name} style={{ background: "#0d1117" }}>
                {p.name}
              </option>
            ))}
          </select>
        </header>

        {/* Desktop persona header strip */}
        <div
          className="hidden md:flex items-center gap-4 px-8 py-4 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white bg-gradient-to-br ${activePersona.gradient}`}
            style={{ boxShadow: `0 0 16px ${activePersona.glowColor}` }}
          >
            {activePersona.initial}
          </div>
          <div>
            <p className="font-semibold text-white text-sm">{activePersona.name}</p>
            <p className="text-xs text-slate-500">{activePersona.role}</p>
          </div>
          <div
            className="ml-auto px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: `${activePersona.accentColor}18`,
              color: activePersona.accentColor,
              border: `1px solid ${activePersona.accentColor}30`,
            }}
          >
            {activePersona.tag}
          </div>
        </div>

        {/* Chat feed */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-5 custom-scrollbar">
          {currentMessages.length === 0 ? (
            /* Welcome screen */
            <div className="h-full flex flex-col items-center justify-center text-center welcome-enter">
              <div
                className={`w-24 h-24 rounded-3xl mb-6 flex items-center justify-center text-3xl font-bold text-white bg-gradient-to-br ${activePersona.gradient}`}
                style={{ boxShadow: `0 0 40px ${activePersona.glowColor}, 0 0 80px ${activePersona.glowColor}50` }}
              >
                {activePersona.initial}
              </div>

              <h2 className="text-3xl font-bold text-white mb-2">
                Hey, I&apos;m{" "}
                <span
                  className="gradient-text"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${activePersona.accentColor}, #a78bfa)`,
                  }}
                >
                  {activePersona.name.split(" ")[0]}
                </span>
              </h2>
              <p className="text-slate-400 max-w-sm mb-2 text-sm leading-relaxed">
                {activePersona.role}
              </p>
              <div
                className="px-3 py-1 rounded-full text-xs font-medium mb-10"
                style={{
                  background: `${activePersona.accentColor}15`,
                  color: activePersona.accentColor,
                  border: `1px solid ${activePersona.accentColor}25`,
                }}
              >
                {activePersona.tag}
              </div>

              <p className="text-xs text-slate-600 uppercase tracking-widest mb-4">
                Start with a question
              </p>
              <div className="flex flex-wrap justify-center gap-2.5 max-w-xl">
                {activePersona.suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(sug)}
                    disabled={isLoading}
                    className="shine-hover px-4 py-2.5 rounded-xl text-sm text-slate-300 transition-all duration-200 hover:text-white"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${activePersona.accentColor}50`;
                      e.currentTarget.style.background = `${activePersona.accentColor}12`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            currentMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex msg-enter ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div
                    className={`w-8 h-8 rounded-xl mr-3 mt-0.5 flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${activePersona.gradient} shrink-0`}
                    style={{ boxShadow: `0 0 12px ${activePersona.glowColor}` }}
                  >
                    {activePersona.initial}
                  </div>
                )}

                <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} max-w-[72%]`}>
                  <div
                    className="px-4 py-3 text-sm leading-relaxed rounded-2xl"
                    style={
                      msg.role === "user"
                        ? {
                            background: `linear-gradient(135deg, ${activePersona.accentColor}, ${activePersona.accentColor}cc)`,
                            color: "#fff",
                            borderRadius: "18px 18px 4px 18px",
                            boxShadow: `0 4px 20px ${activePersona.accentColor}30`,
                          }
                        : {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#cbd5e1",
                            borderRadius: "4px 18px 18px 18px",
                          }
                    }
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-slate-600 mt-1.5 px-1">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === "user" && (
                  <div
                    className="w-8 h-8 rounded-xl ml-3 mt-0.5 flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    U
                  </div>
                )}
              </div>
            ))
          )}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex justify-start msg-enter">
              <div
                className={`w-8 h-8 rounded-xl mr-3 mt-0.5 flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${activePersona.gradient} shrink-0`}
                style={{ boxShadow: `0 0 12px ${activePersona.glowColor}` }}
              >
                {activePersona.initial}
              </div>
              <div
                className="px-5 py-4 rounded-2xl flex items-center gap-1"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "4px 18px 18px 18px",
                }}
              >
                <span className="text-xs text-slate-500 mr-2">{activePersona.name.split(" ")[0]} is typing</span>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 typing-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div
          className="px-4 md:px-8 pt-4 pb-5 shrink-0"
          style={{
            background: "rgba(8,11,20,0.8)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center gap-3 max-w-4xl mx-auto"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder={`Ask ${activePersona.name.split(" ")[0]} something...`}
                disabled={isLoading}
                className="w-full rounded-2xl pl-5 pr-14 py-4 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = `${activePersona.accentColor}60`;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${activePersona.accentColor}15`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: input.trim()
                  ? `linear-gradient(135deg, ${activePersona.accentColor}, ${activePersona.accentColor}cc)`
                  : "rgba(255,255,255,0.06)",
                boxShadow: input.trim() ? `0 4px 16px ${activePersona.accentColor}50` : "none",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
