# Scaler Persona-Based AI Chatbot

A highly customized, persona-based AI chatbot featuring Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra from Scaler. This project leverages the fast Groq API (Llama 3) and Next.js to deliver a premium, responsive conversational experience.

## Features
- **3 Distinct Personas:** Switch between Anshuman, Abhimanyu, and Kshitij. Each has a highly-engineered system prompt capturing their unique teaching and leadership styles.
- **Lightning Fast Inference:** Powered by Groq's LPU technology and Llama 3 8B.
- **Premium UI:** A sleek, modern dark-mode interface built with Vanilla CSS.
- **Mobile Responsive:** Fully functional on both desktop and mobile devices.
- **Suggestion Chips:** Quick-start questions tailored to each persona to get the conversation going.

## Live Demo
> **[Insert your Vercel/Netlify Deployed Link Here]**

## Setup Instructions (Local Development)

### Prerequisites
- Node.js (v18 or higher)
- A free API key from [Groq Console](https://console.groq.com)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <your-repo-link>
   cd Persona-1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   - Copy the `.env.example` file and rename it to `.env.local`
   - Paste your Groq API Key into `.env.local`:
   ```env
   GROQ_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the App:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Documentation
- `prompts.md`: Contains the detailed system prompts, rationale, and constraints for each persona.
- `reflection.md`: A 300-500 word reflection on the build process and the GIGO principle.

## Tech Stack
- **Frontend:** Next.js (App Router), React, Vanilla CSS
- **Backend:** Next.js API Routes, Groq SDK
- **LLM:** Llama-3-8b-8192 (via Groq)
