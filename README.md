# Scaler Persona-Based AI Chatbot 🤖

> A production-ready, persona-based AI chatbot featuring **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra** from Scaler Academy. Built with Next.js, Groq API (Llama 3.3 70B), and Tailwind CSS.

---

## 🔗 Live Demo

**👉 [Insert your Vercel Deployed Link Here after deployment]**

---

## ✨ Features

- **3 Deeply Researched Personas** — Each persona has a highly-engineered system prompt capturing their real communication style, values, background, and constraints. Not generic AI.
- **Strict Guardrail Behavior** — Personas ask for clarification on vague input, steer off-topic questions back, and never break character.
- **Independent Chat History** — Each persona maintains its own separate conversation memory. Switching personas and switching back preserves the chat.
- **Premium Dark UI** — Glassmorphism sidebar, ambient persona-colored glow, animated typing indicator, and smooth message transitions.
- **Suggestion Chips** — Quick-start questions per persona to guide the conversation.
- **Typing Indicator** — Shows "[Name] is typing..." while awaiting a response.
- **Mobile Responsive** — Fully functional on both desktop and mobile via a dropdown selector.
- **Graceful Error Handling** — API failures show a user-friendly message instead of crashing.

---

## 📁 Repository Structure

```
Persona-1/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js      # Backend API route with persona system prompts
│   ├── globals.css            # Tailwind CSS + custom animations
│   ├── layout.js              # Root layout
│   └── page.js               # Main chat interface (React)
├── public/                    # Static assets
├── .env.example               # Template for environment variables
├── .env.local                 # Your actual API key (NOT committed to git)
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.mjs         # PostCSS configuration
├── prompts.md                 # All 3 system prompts with inline annotations
├── reflection.md              # 300-500 word reflection on GIGO and the build
└── README.md                  # This file
```

---

## 🛠️ Tech Stack

| Layer       | Technology                              |
|-------------|-----------------------------------------|
| Framework   | Next.js 16 (App Router)                 |
| Frontend    | React, Tailwind CSS (v3)                |
| Backend     | Next.js API Routes                      |
| LLM         | Llama 3.3 70B Versatile (via Groq)     |
| Deployment  | Vercel                                  |

---

## 🚀 Local Setup Instructions

### Prerequisites
- Node.js v18 or higher
- A free API key from [Groq Console](https://console.groq.com)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Persona-1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and paste your Groq API key:
   ```env
   GROQ_API_KEY=your_actual_groq_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment (Vercel)

1. Push your repository to GitHub (make sure `.env.local` is in `.gitignore`).
2. Go to [Vercel](https://vercel.com) and import the GitHub repository.
3. In **Project Settings → Environment Variables**, add:
   - **Key:** `GROQ_API_KEY`
   - **Value:** your Groq API key
4. Click **Deploy**.

> ⚠️ **Never commit your `.env.local` file or hardcode your API key in source code.**

---

## 📄 Documentation

| File | Description |
|------|-------------|
| [`prompts.md`](./prompts.md) | All 3 system prompts with inline comments explaining every design decision |
| [`reflection.md`](./reflection.md) | 300–500 word reflection on the GIGO principle and build process |

---

## ✅ Assignment Submission Checklist

- [x] GitHub repo is public with a clear README
- [x] `.env.example` present, no real API key committed
- [x] `prompts.md` with all 3 system prompts + inline annotations
- [x] `reflection.md` (300–500 words) covering GIGO and improvements
- [x] All 3 personas working with distinct, researched system prompts
- [x] Each prompt has: Persona description, Few-shot examples, CoT instruction, Output format, Constraints
- [x] Persona switching resets the active conversation
- [x] Typing indicator present
- [x] Suggestion chips per persona
- [x] Mobile responsive
- [x] API errors handled gracefully
- [ ] App deployed and live URL added above ← **Complete this after Vercel deployment**
