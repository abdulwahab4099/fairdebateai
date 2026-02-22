'use client';

import { useState } from 'react';
import { DebateResult } from '@/lib/types';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DebateResult | null>(null);
  const [error, setError] = useState('');
  const [currentPhase, setCurrentPhase] = useState('');

  const runDebate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);
    setCurrentPhase('Initializing Admin Orchestrator...');

    try {
      const response = await fetch('/api/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) throw new Error('Failed to run debate');

      const data = await response.json();
      setResult(data);
      setCurrentPhase('');
    } catch (err) {
      setError('Failed to execute debate. Please try again.');
      setCurrentPhase('');
    } finally {
      setLoading(false);
    }
  };

  // Simulate phase updates for better UX
  useState(() => {
    if (loading) {
      const phases = [
        'Initializing Admin Orchestrator...',
        'Creating debate agents with unique personalities...',
        'Generating Round 1: Opening Arguments...',
        'Generating Round 2: Rebuttals...',
        'Generating Round 3: Closing Statements...',
        'Analyzing debate performance...',
        'Generating final summary...',
        'Finalizing results...'
      ];
      
      let phaseIndex = 0;
      const interval = setInterval(() => {
        if (phaseIndex < phases.length) {
          setCurrentPhase(phases[phaseIndex]);
          phaseIndex++;
        }
      }, 4000);

      return () => clearInterval(interval);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Autonomous Debate Engine
          </h1>
          <p className="text-gray-300 text-lg">Structured AI Debate Orchestration</p>
        </header>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
          <div className="flex gap-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter debate topic..."
              className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/20 focus:border-purple-500 focus:outline-none text-white placeholder-gray-400"
              disabled={loading}
            />
            <button
              onClick={runDebate}
              disabled={loading || !topic.trim()}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Running...' : 'Start Debate'}
            </button>
          </div>
          {error && <p className="text-red-400 mt-4">{error}</p>}
        </div>

        {loading && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-purple-300">Admin Orchestrator Active</h3>
                <p className="text-gray-300 text-lg">{currentPhase}</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>System is processing your debate...</span>
                </div>
                <div className="mt-6 space-y-2 text-sm text-gray-400">
                  <p>✓ Enforcing strict word limits</p>
                  <p>✓ Ensuring unique agent personalities</p>
                  <p>✓ Maintaining logical progression</p>
                  <p>✓ Generating structured output</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-8">
            {/* Agents */}
            <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold mb-6 text-purple-300">Debate Agents</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {result.agents.map((agent, idx) => (
                  <div key={idx} className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="font-bold text-xl mb-2">{agent.name}</h3>
                    <p className="text-sm text-purple-300 mb-3 uppercase">{agent.stance}</p>
                    <p className="text-gray-300 text-sm mb-2">{agent.personality}</p>
                    <p className="text-gray-400 text-xs">{agent.approach}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Rounds */}
            {[1, 2, 3].map((roundNum) => {
              const round = result[`round${roundNum}` as keyof DebateResult] as any;
              const titles = ['Opening Arguments', 'Rebuttals', 'Closing Statements'];
              return (
                <section key={roundNum} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <h2 className="text-2xl font-bold mb-6 text-purple-300">Round {roundNum}: {titles[roundNum - 1]}</h2>
                  <div className="space-y-6">
                    {['pro', 'con', 'neutral'].map((stance) => (
                      <div key={stance} className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h3 className="font-semibold text-lg mb-3 text-pink-300 uppercase">{stance}</h3>
                        <p className="text-gray-200 leading-relaxed">{round[stance]}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Analysis */}
            <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold mb-6 text-purple-300">Analysis</h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="pb-3 pr-4">Agent</th>
                      <th className="pb-3 pr-4">Logic</th>
                      <th className="pb-3 pr-4">Evidence</th>
                      <th className="pb-3 pr-4">Rebuttal</th>
                      <th className="pb-3 pr-4">Clarity</th>
                      <th className="pb-3">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.analysis.scores.map((score, idx) => (
                      <tr key={idx} className="border-b border-white/10">
                        <td className="py-3 pr-4">{score.agent}</td>
                        <td className="py-3 pr-4">{score.logic}</td>
                        <td className="py-3 pr-4">{score.evidence}</td>
                        <td className="py-3 pr-4">{score.rebuttal}</td>
                        <td className="py-3 pr-4">{score.clarity}</td>
                        <td className="py-3 font-bold">{score.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 mb-6 border border-purple-500/30">
                <h3 className="font-bold text-xl mb-2">Winner: {result.analysis.winner}</h3>
                <p className="text-gray-200">{result.analysis.justification}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-3 text-green-300">Strengths</h3>
                  {Object.entries(result.analysis.strengths).map(([key, value]) => (
                    <div key={key} className="mb-3">
                      <p className="text-sm text-purple-300 uppercase">{key}</p>
                      <p className="text-gray-200 text-sm">{value}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3 text-red-300">Weaknesses</h3>
                  {Object.entries(result.analysis.weaknesses).map(([key, value]) => (
                    <div key={key} className="mb-3">
                      <p className="text-sm text-purple-300 uppercase">{key}</p>
                      <p className="text-gray-200 text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Summary */}
            <section className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold mb-6 text-purple-300">Final Summary</h2>
              <p className="text-gray-200 leading-relaxed text-lg">{result.summary}</p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
