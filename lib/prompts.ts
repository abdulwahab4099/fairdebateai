// System prompts for the Admin Orchestrator

export const ADMIN_SYSTEM_PROMPT = `You are the Admin Orchestrator of a structured AI debate system. You are responsible for creating agents, enforcing debate structure, maintaining strict word limits, and ensuring logical progression. You must follow all formatting instructions exactly. No commentary outside defined structure. Precision over creativity.`;

export const AGENT_CREATION_PROMPT = (topic: string) => `
Create exactly 3 debate agents for the topic: "${topic}"

Requirements:
- Exactly 3 agents with fixed stances: Pro Advocate, Con Advocate, Neutral Strategic Analyst
- Each agent description: 25-30 words maximum
- Unique personalities (no duplication)
- No emotional exaggeration
- Structured output only

Output format (JSON):
{
  "agents": [
    {
      "name": "Agent Name",
      "stance": "pro",
      "personality": "Brief personality description",
      "approach": "Core strategic approach"
    }
  ]
}

Generate now.`;

export const ROUND_1_PROMPT = (topic: string, agents: any[]) => `
Topic: "${topic}"

Agents:
${agents.map(a => `- ${a.name} (${a.stance}): ${a.personality}`).join('\n')}

Generate Round 1 - Opening Arguments:
- 80-100 words per agent
- Strong unique arguments
- No storytelling
- No repetition of topic sentence
- Direct and analytical

Output format (JSON):
{
  "round1": {
    "pro": "argument text",
    "con": "argument text",
    "neutral": "argument text"
  }
}`;

export const ROUND_2_PROMPT = (topic: string, agents: any[], round1: any) => `
Topic: "${topic}"

Previous Round:
Pro: ${round1.pro}
Con: ${round1.con}
Neutral: ${round1.neutral}

Generate Round 2 - Rebuttals:
- 70-90 words per agent
- Must directly challenge another argument
- No repeating opening arguments
- Engage with specific points

Output format (JSON):
{
  "round2": {
    "pro": "rebuttal text",
    "con": "rebuttal text",
    "neutral": "rebuttal text"
  }
}`;

export const ROUND_3_PROMPT = (topic: string, agents: any[], round1: any, round2: any) => `
Topic: "${topic}"

Generate Round 3 - Closing Statements:
- 60-80 words per agent
- Reinforce strongest points
- No new arguments
- Conclusive tone

Output format (JSON):
{
  "round3": {
    "pro": "closing text",
    "con": "closing text",
    "neutral": "closing text"
  }
}`;

export const ANALYSIS_PROMPT = (topic: string, agents: any[], rounds: any) => `
Analyze the complete debate on: "${topic}"

DEBATE AGENTS:
${agents.map((a, i) => `${i + 1}. ${a.name} (${a.stance}): ${a.personality}`).join('\n')}

ROUND 1 - OPENING ARGUMENTS:
Pro: ${rounds.round1.pro}

Con: ${rounds.round1.con}

Neutral: ${rounds.round1.neutral}

ROUND 2 - REBUTTALS:
Pro: ${rounds.round2.pro}

Con: ${rounds.round2.con}

Neutral: ${rounds.round2.neutral}

ROUND 3 - CLOSING STATEMENTS:
Pro: ${rounds.round3.pro}

Con: ${rounds.round3.con}

Neutral: ${rounds.round3.neutral}

Score each agent on:
- Logic (0-10)
- Evidence Strength (0-10)
- Rebuttal Effectiveness (0-10)
- Clarity (0-10)

CRITICAL: You must respond with ONLY valid JSON. No markdown, no explanation, just JSON.

Output format:
{
  "analysis": {
    "scores": [
      {
        "agent": "Pro Advocate",
        "logic": 8,
        "evidence": 7,
        "rebuttal": 9,
        "clarity": 8,
        "total": 32
      },
      {
        "agent": "Con Advocate",
        "logic": 7,
        "evidence": 8,
        "rebuttal": 7,
        "clarity": 9,
        "total": 31
      },
      {
        "agent": "Neutral Analyst",
        "logic": 9,
        "evidence": 8,
        "rebuttal": 8,
        "clarity": 9,
        "total": 34
      }
    ],
    "winner": "Neutral Analyst",
    "strengths": {
      "Pro": "Strong logical framework and clear argumentation",
      "Con": "Excellent evidence presentation and clarity",
      "Neutral": "Balanced analysis with effective rebuttals"
    },
    "weaknesses": {
      "Pro": "Could strengthen evidence base",
      "Con": "Rebuttal could be more direct",
      "Neutral": "Could take stronger stance on key points"
    },
    "justification": "Winner demonstrated superior overall performance across all metrics with particularly strong logic and clarity."
  }
}

Generate the analysis now in pure JSON format.`;

export const SUMMARY_PROMPT = (topic: string, fullDebate: any) => `
Generate a balanced final summary for the debate on: "${topic}"

COMPLETE DEBATE CONTENT:

AGENTS:
${fullDebate.agents.map((a: any, i: number) => `${i + 1}. ${a.name} (${a.stance})`).join('\n')}

ROUND 1:
Pro: ${fullDebate.round1.pro}
Con: ${fullDebate.round1.con}
Neutral: ${fullDebate.round1.neutral}

ROUND 2:
Pro: ${fullDebate.round2.pro}
Con: ${fullDebate.round2.con}
Neutral: ${fullDebate.round2.neutral}

ROUND 3:
Pro: ${fullDebate.round3.pro}
Con: ${fullDebate.round3.con}
Neutral: ${fullDebate.round3.neutral}

ANALYSIS WINNER: ${fullDebate.analysis.winner}

Requirements:
- 120 words maximum
- Balanced tone
- No winner mention
- Extract main themes
- Provide takeaway insight

CRITICAL: You must respond with ONLY valid JSON. No markdown, no explanation, just JSON.

Output format:
{
  "summary": "Your 120-word summary text here that captures the main themes and provides balanced insight without mentioning the winner."
}

Generate the summary now in pure JSON format.`;
