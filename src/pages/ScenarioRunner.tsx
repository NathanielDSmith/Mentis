import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getScenarioById } from '../data/scenarios';
import { useScenarioFlow, type ScenarioFlowState } from '../hooks/useScenarioFlow';
import RevealStep from '../components/RevealStep';
import ChoiceGrid from '../components/ChoiceGrid';
import FeedbackPanel from '../components/FeedbackPanel';
import FreetextRunner from '../components/FreetextRunner';
import type { Scenario } from '../types/scenario';

const DIFFICULTY_BADGE: Record<string, string> = {
  junior: 'text-emerald-400 border-emerald-800 bg-emerald-950/40',
  mid: 'text-amber-400 border-amber-800 bg-amber-950/40',
  senior: 'text-red-400 border-red-800 bg-red-950/40',
};

export default function ScenarioRunner() {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const scenario = getScenarioById(scenarioId ?? '');

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-mentis-muted text-sm mb-4">scenario not found</p>
          <Link to="/" className="font-mono text-mentis-accent hover:underline text-sm">
            ← back to lab
          </Link>
        </div>
      </div>
    );
  }

  if (scenario.mode === 'freetext') {
    return <FreetextPage scenario={scenario} />;
  }

  return <Runner scenarioId={scenarioId!} />;
}

function FreetextPage({ scenario }: { scenario: Scenario }) {
  return (
    <div className="min-h-screen text-mentis-text relative z-10">
      <header className="sticky top-0 bg-mentis-bg/80 backdrop-blur-md z-20">
        <div className="border-b border-mentis-border px-5 py-4 md:px-8 md:py-5 flex items-center justify-between">
          <Link to="/" className="font-mono text-mentis-muted hover:text-mentis-text text-xs transition-colors">
            ← lab
          </Link>
          <span className="font-mono font-bold text-mentis-accent tracking-wider text-sm">MENTIS</span>
          <div className="w-12" />
        </div>
        <div className="h-[2px] bg-mentis-border/50" />
      </header>

      <main className="max-w-2xl mx-auto px-5 py-8 pb-20 md:px-8 md:py-12 md:pb-28">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`font-mono text-xs px-2 py-0.5 rounded border ${DIFFICULTY_BADGE[scenario.difficulty]}`}>
              {scenario.difficulty}
            </span>
            {scenario.tags.map((tag) => (
              <span key={tag} className="font-mono text-xs text-mentis-muted border border-mentis-border rounded px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-mentis-text mb-3">{scenario.title}</h1>
          <p className="text-mentis-muted text-sm leading-relaxed">{scenario.subtitle}</p>
        </div>

        <div className="border-t border-mentis-border mb-10" />

        <FreetextRunner scenario={scenario} />
      </main>
    </div>
  );
}

function Runner({ scenarioId }: { scenarioId: string }) {
  const scenario = getScenarioById(scenarioId)!;
  const { state, revealNext, submitAnswer, revealNextFeedback } = useScenarioFlow(scenario);
  const navigate = useNavigate();

  const [isTyping, setIsTyping] = useState(true);

  const { stage, revealedSteps, selectedChoiceId, isCorrect, feedbackLayerIndex } = state;
  const isLastStep = revealedSteps === scenario.revealSteps.length - 1;
  const selectedChoice = scenario.choices.find((c) => c.id === selectedChoiceId) ?? null;
  const isAnswering = stage === 'answering';
  const isFeedback = stage === 'feedback' || stage === 'complete';
  const isComplete = stage === 'complete';

  function handleRevealNext() {
    setIsTyping(true);
    revealNext();
  }

  return (
    <div className="min-h-screen text-mentis-text relative z-10">
      <header className="sticky top-0 bg-mentis-bg/80 backdrop-blur-md z-20">
        <div className="border-b border-mentis-border px-5 py-4 md:px-8 md:py-5 flex items-center justify-between">
          <Link to="/" className="font-mono text-mentis-muted hover:text-mentis-text text-xs transition-colors">
            ← lab
          </Link>
          <span className="font-mono font-bold text-mentis-accent tracking-wider text-sm">MENTIS</span>
          <div className="w-12" />
        </div>
        <ProgressBar scenario={scenario} state={state} />
      </header>

      <main className="max-w-2xl mx-auto px-5 py-8 pb-20 md:px-8 md:py-12 md:pb-28">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`font-mono text-xs px-2 py-0.5 rounded border ${DIFFICULTY_BADGE[scenario.difficulty]}`}>
              {scenario.difficulty}
            </span>
            {scenario.tags.map((tag) => (
              <span key={tag} className="font-mono text-xs text-mentis-muted border border-mentis-border rounded px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-mentis-text mb-3">{scenario.title}</h1>
          <p className="text-mentis-muted text-sm leading-relaxed">{scenario.context}</p>
        </div>

        <div className="border-t border-mentis-border mb-10" />

        <div className="grid gap-10">
          {scenario.revealSteps.map((step, i) => {
            if (i > revealedSteps) return null;
            return (
              <RevealStep
                key={i}
                index={i}
                step={step}
                animate={i === revealedSteps && stage === 'reading'}
                onDone={() => setIsTyping(false)}
              />
            );
          })}
        </div>

        {(isAnswering || isFeedback) && (
          <ChoiceGrid
            choices={scenario.choices}
            selectedId={selectedChoiceId}
            isCorrect={isCorrect}
            onSelect={submitAnswer}
            locked={isFeedback}
            choicePrompt={scenario.choicePrompt}
          />
        )}

        {isFeedback && (
          <FeedbackPanel
            layers={scenario.feedbackLayers}
            visibleCount={feedbackLayerIndex}
            isCorrect={isCorrect!}
            onRevealNext={revealNextFeedback}
            isComplete={isComplete}
            choiceFeedback={selectedChoice?.feedback}
            choiceRank={selectedChoice?.rank}
          />
        )}

        {isComplete && (
          <div className="mt-10 slide-up">
            <button
              onClick={() => navigate('/')}
              className="font-mono text-sm text-mentis-text border border-mentis-border
                         hover:border-mentis-accent/40 hover:bg-mentis-surface-hover active:scale-[0.97]
                         rounded-lg px-5 py-2.5 transition-all duration-150
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mentis-border focus-visible:ring-offset-2 focus-visible:ring-offset-mentis-bg"
            >
              ← back to lab
            </button>
          </div>
        )}

        {stage === 'reading' && (
          <div className="mt-10">
            <button
              onClick={handleRevealNext}
              disabled={isTyping}
              className="font-mono text-sm bg-mentis-accent hover:bg-mentis-accent-dim active:scale-[0.97] text-white
                         rounded-lg px-6 py-3 transition-all duration-150 font-medium
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mentis-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-mentis-bg
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isLastStep ? (scenario.actionLabel ?? 'make your diagnosis →') : 'continue →'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function ProgressBar({ scenario, state }: { scenario: Scenario; state: ScenarioFlowState }) {
  const total = scenario.revealSteps.length + 1 + scenario.feedbackLayers.length;
  let current = 0;
  if (state.stage === 'reading') current = state.revealedSteps;
  if (state.stage === 'answering') current = scenario.revealSteps.length;
  if (state.stage === 'feedback') current = scenario.revealSteps.length + 1 + state.feedbackLayerIndex;
  if (state.stage === 'complete') current = total;

  const pct = Math.round((current / total) * 100);

  return (
    <div className="h-[2px] bg-mentis-border/50">
      <div
        className="h-full bg-mentis-accent/70 transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
