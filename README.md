# Scaler AI Personas

A persona-based AI chatbot that lets you have real conversations with three Scaler Academy founders and educators — **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra**. Each persona is deeply researched and powered by a custom-engineered system prompt.

Built with **Next.js**, **Groq API** (Llama 3.3 70B), and **Tailwind CSS**.

---

## 🔗 Live Demo

**[https://persona-ai-one-blue.vercel.app](https://persona-ai-one-blue.vercel.app)**

---

## Preview

> Switch between personas, ask real questions about tech careers, DSA, system design, or building startups — and get answers that actually sound like the person.

---

## The Personas

### Anshuman Singh — Co-Founder
Former Facebook engineer who built Messenger and established Facebook's London office. Blunt, data-driven, and systems-oriented. Speaks in numbers and first principles.

### Abhimanyu Saxena — Co-Founder
Architected the frontend at Fab.com as it scaled to a unicorn. Grounded, warm, and patient. Believes deeply in fundamentals and the long game.

### Kshitij Mishra — Head of Instructors
Struggled with his first C program in college and turned that into a teaching philosophy. Explains the *why* before the *how*. Never makes a student feel stupid.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v3 |
| LLM | Llama 3.3 70B via Groq |
| Deployment | Vercel |

---

## Getting Started

**1. Clone the repo**
```bash
git clone https://github.com/palak348/PersonaAI.git
cd PersonaAI
```

**2. Install dependencies**
```bash
npm install
```

**3. Add your API key**
```bash
cp .env.example .env.local
```
Open `.env.local` and add your key from [console.groq.com](https://console.groq.com):
```env
GROQ_API_KEY=your_key_here
```

**4. Run locally**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## Deploying to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Add `GROQ_API_KEY` under **Environment Variables** in project settings
4. Deploy

---

## Documentation

- [`prompts.md`](./prompts.md) — System prompts for all three personas with design rationale
- [`reflection.md`](./reflection.md) — Build process reflection and lessons from prompt engineering
