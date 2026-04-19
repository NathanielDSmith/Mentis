import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getScenarioById } from '../data/scenarios';
import { useScenarioFlow } from '../hooks/useScenarioFlow';
import RevealStep from '../components/RevealStep';
import ChoiceGrid from '../components/ChoiceGrid';
import FeedbackPanel from '../components/FeedbackPanel';

const DIFFICULTY_BADGE: Record<string, string> = {
  junior: 'text-emerald-400 border-emerald-800',
  mid: 'text-amber-400 border-amber-800',
  senior: 'text-red-400 border-red-800',
};

export default function ScenarioRunner() {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const navigate = useNavigate();
  const scenario = getScenarioById(scenarioId ?? '');

  if (!scenario) {
    return (
      <div className="min-h-screen bg-mentis-bg flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-mentis-muted text-sm mb-4">scenario not found</p>
          <Link to="/" className="font-mono text-mentis-accent hover:underline text-sm">
            ← back to lab
          </Link>
        </div>
      </div>
    );
  }

  return <Runner scenarioId={scenarioId!} />;
}

function Runner({ scenarioId }: { scenarioId: string }) {
  const scenario = getScenarioById(scenarioId)!;
  const { state, revealNext, submitAnswer, revealNextFeedback } = useScenarioFlow(scenario);
  const navigate = useNavigate();

  const { stage, revealedSteps, selectedChoiceId, isCorrect, feedbackLayerIndex } = state;
  const isLastStep = revealedSteps === scenario.revealSteps.length - 1;
  const isAnswering = stage === 'answering';
  const isFeedback = stage === 'feedback' || stage === 'complete';
  const isComplete = stage === 'complete';

  return (
    <div className="min-h-screen bg-mentis-bg text-mentis-text">
      {/* Top nav */}
      <header className="border-b border-mentis-border px-6 py-4 flex items-center justify-between sticky top-0 bg-mentis-bg/95 backdrop-blur-sm z-10">
        <Link to="/" className="font-mono text-mentis-muted hover:text-mentis-text text-xs transition-colors">
          ← lab
        </Link>
        <span className="font-mono font-bold text-mentis-accent tracking-wider text-sm">MENTIS</span>
        <div className="w-12" />
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10 pb-24">
        {/* Scenario header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`font-mono text-xs px-2 py-0.5 rounded border ${DIFFICULTY_BADGE[scenario.difficulty]}`}>
              {scenario.difficulty}
            </span>
            {scenario.tags.map((tag) => (
              <span key={tag} className="font-mono text-xs text-mentis-muted border border-mentis-border rounded px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-mentis-text mb-2">{scenario.title}</h1>
          <p className="text-mentis-muted text-sm leading-relaxed">{scenario.context}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-mentis-border mb-8" />

        {/* Reveal steps */}
        <div className="grid gap-8">
          {scenario.revealSteps.map((step, i) => {
            if (i > revealedSteps) return null;
            return (
              <RevealStep
                key={i}
                index={i}
                step={step}
                animate={i === revealedSteps && i > 0}
              />
            );
          })}
        </div>

        {/* Choice grid */}
        {(isAnswering || isFeedback) && (
          <ChoiceGrid
            choices={scenario.choices}
            selectedId={selectedChoiceId}
            isCorrect={isCorrect}
            onSelect={submitAnswer}
            locked={isFeedback}
          />
        )}

        {/* Feedback */}
        {isFeedback && (
          <FeedbackPanel
            layers={scenario.feedbackLayers}
            visibleCount={feedbackLayerIndex}
            isCorrect={isCorrect!}
            onRevealNext={revealNextFeedback}
            isComplete={isComplete}
          />
        )}

        {/* Complete — back to lobby */}
        {isComplete && (
          <div className="mt-10 slide-up flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="font-mono text-sm text-mentis-text border border-mentis-border
                         hover:border-mentis-accent/40 hover:bg-mentis-surface-hover
                         rounded-lg px-5 py-2.5 transition-all duration-150"
            >
              ← back to lab
            </button>
          </div>
        )}

        {/* Continue CTA (reading stage only) */}
        {stage === 'reading' && (
          <div className="mt-10">
            <button
              onClick={revealNext}
              className="font-mono text-sm bg-mentis-accent hover:bg-mentis-accent-dim text-white
                         rounded-lg px-6 py-3 transition-all duration-150 font-medium"
            >
              {isLastStep ? 'make your diagnosis →' : 'continue →'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
