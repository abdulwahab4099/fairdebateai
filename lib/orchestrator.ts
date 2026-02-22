// Admin Orchestrator - The Brain of the Debate System
import { generateContent } from './gemini-client';
import {
  AGENT_CREATION_PROMPT,
  ROUND_1_PROMPT,
  ROUND_2_PROMPT,
  ROUND_3_PROMPT,
  ANALYSIS_PROMPT,
  SUMMARY_PROMPT,
} from './prompts';
import { DebateResult } from './types';

const parseJSON = (text: string, phase: string): any => {
  // Try to find JSON in markdown code blocks first
  const codeBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
  if (codeBlockMatch) {
    return JSON.parse(codeBlockMatch[1]);
  }
  
  // Try to find raw JSON
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error(`No JSON found in ${phase} response:`, text);
    throw new Error(`No JSON found in ${phase} response`);
  }
  
  try {
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error(`Failed to parse JSON in ${phase}:`, jsonMatch[0]);
    throw error;
  }
};

export class DebateOrchestrator {
  async runDebate(topic: string): Promise<DebateResult> {
    console.log('🎯 Admin Orchestrator: Starting debate system...');

    // Phase 1: Agent Creation
    console.log('📝 Phase 1: Creating debate agents...');
    const agentsText = await generateContent(AGENT_CREATION_PROMPT(topic));
    const agentsData = parseJSON(agentsText, 'Agent Creation');
    const agents = agentsData.agents;

    // Phase 2: Round 1 - Opening Arguments
    console.log('🎤 Phase 2: Round 1 - Opening Arguments...');
    const round1Text = await generateContent(ROUND_1_PROMPT(topic, agents));
    const round1Data = parseJSON(round1Text, 'Round 1');
    const round1 = round1Data.round1;

    // Phase 3: Round 2 - Rebuttals
    console.log('⚔️ Phase 3: Round 2 - Rebuttals...');
    const round2Text = await generateContent(ROUND_2_PROMPT(topic, agents, round1));
    const round2Data = parseJSON(round2Text, 'Round 2');
    const round2 = round2Data.round2;

    // Phase 4: Round 3 - Closing Statements
    console.log('🎬 Phase 4: Round 3 - Closing Statements...');
    const round3Text = await generateContent(ROUND_3_PROMPT(topic, agents, round1, round2));
    const round3Data = parseJSON(round3Text, 'Round 3');
    const round3 = round3Data.round3;

    // Phase 5: Analysis
    console.log('📊 Phase 5: Analyzing debate performance...');
    const analysisText = await generateContent(
      ANALYSIS_PROMPT(topic, agents, { round1, round2, round3 })
    );
    const analysisData = parseJSON(analysisText, 'Analysis');
    const analysis = analysisData.analysis;

    // Phase 6: Final Summary
    console.log('📋 Phase 6: Generating final summary...');
    const summaryText = await generateContent(
      SUMMARY_PROMPT(topic, { agents, round1, round2, round3, analysis })
    );
    const summaryData = parseJSON(summaryText, 'Summary');
    const summary = summaryData.summary;

    console.log('✅ Admin Orchestrator: Debate complete!');

    return {
      topic,
      agents,
      round1,
      round2,
      round3,
      analysis,
      summary,
    };
  }
}
