// Core type definitions for the debate system

export interface DebateAgent {
  name: string;
  stance: 'pro' | 'con' | 'neutral';
  personality: string;
  approach: string;
}

export interface DebateRound {
  pro: string;
  con: string;
  neutral: string;
}

export interface AgentScore {
  agent: string;
  logic: number;
  evidence: number;
  rebuttal: number;
  clarity: number;
  total: number;
}

export interface DebateAnalysis {
  scores: AgentScore[];
  winner: string;
  strengths: Record<string, string>;
  weaknesses: Record<string, string>;
  justification: string;
}

export interface DebateResult {
  topic: string;
  agents: DebateAgent[];
  round1: DebateRound;
  round2: DebateRound;
  round3: DebateRound;
  analysis: DebateAnalysis;
  summary: string;
}
