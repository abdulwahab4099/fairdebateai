# Autonomous Debate Engine

A structured AI debate orchestration system powered by Google Gemini API and Agentic Development Kit.

## Architecture

### Admin Orchestrator (The Brain)
The system is governed by an Admin Orchestrator that:
- Designs debate agents with unique personalities
- Assigns fixed stances (Pro, Con, Neutral)
- Enforces strict structure and word limits
- Runs sequential debate rounds
- Triggers analytical evaluation
- Produces balanced final summary

### System Flow
```
User Topic Input
    ↓
Admin Agent Activated
    ↓
Agent Creation Phase (3 agents)
    ↓
Round 1: Opening Arguments (80-100 words)
    ↓
Round 2: Rebuttals (70-90 words)
    ↓
Round 3: Closing Statements (60-80 words)
    ↓
Analysis Phase (Scoring & Winner)
    ↓
Final Summary (120 words max)
    ↓
Structured JSON Response
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure Gemini API:
Create `.env.local` file:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

3. Run development server:
```bash
npm run dev
```

4. Open http://localhost:3000

## Features

- **Deterministic Structure**: Temperature ~0.6 for consistent formatting
- **Strict Word Limits**: Enforced at each debate round
- **Unique Agent Personalities**: No duplication allowed
- **Sequential AI Calls**: Better control and debugging
- **Analytical Scoring**: Logic, Evidence, Rebuttal, Clarity (0-10 each)
- **JSON-Ready Output**: Direct UI rendering without manual fixes

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Google Gemini API (@google/genai)
- Tailwind CSS
- React 19

## Competitive Advantage

This isn't just "AI debate" - it's **structured, disciplined, controlled AI debate orchestration**.

Most systems show chaotic GPT outputs. This system shows a governed, reproducible debate framework.
