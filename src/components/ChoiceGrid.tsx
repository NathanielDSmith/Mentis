import { useEffect, useState } from 'react';
import type { Choice } from '../types/scenario';

const RANK_LABEL: Record<number, string> = {
  1: 'best pick',
  2: 'solid',
  3: 'decent',
  4: 'not ideal',
};

const RANK_COLOR: Record<number, string> = {
  1: 'text-mentis-correct',
  2: 'text-amber-400',
  3: 'text-amber-500',
  4: 'text-mentis-wrong',
};

interface Props {
  choices: Choice[];
  selectedId: string | null;
  isCorrect: boolean | null;
  onSelect: (id: string) => void;
  locked: boolean;
  choicePrompt?: string;
}

export default function ChoiceGrid({ choices, selectedId, isCorrect, onSelect, locked, choicePrompt }: Props) {
  const [feedbackClass, setFeedbackClass] = useState('');

  useEffect(() => {
    if (isCorrect === null) return;
    const cls = isCorrect ? 'bounce-correct' : 'shake';
    setFeedbackClass(cls);
    const t = setTimeout(() => setFeedbackClass(''), 600);
    return () => clearTimeout(t);
  }, [isCorrect]);

  const isRanked = choices.some((c) => c.rank !== undefined);

  return (
    <div className="slide-up mt-8">
      <p className="font-mono text-xs text-mentis-muted tracking-widest uppercase mb-4">
        {choicePrompt ?? "What's causing this?"}
      </p>
      <div className={`grid gap-3 ${feedbackClass}`}>
        {choices.map((choice, i) => {
          const isSelected = selectedId === choice.id;
          const showResult = locked && isSelected;

          let borderClass = 'border-mentis-border hover:border-mentis-accent/50 hover:bg-mentis-surface-hover hover:shadow-sm';
          if (showResult && isCorrect) borderClass = 'border-mentis-correct bg-green-950/30';
          if (showResult && !isCorrect && isRanked && choice.rank !== 4) borderClass = 'border-amber-700 bg-amber-950/20';
          if (showResult && !isCorrect && (!isRanked || choice.rank === 4)) borderClass = 'border-mentis-wrong bg-red-950/30';
          if (locked && !isSelected) borderClass = 'border-mentis-border opacity-40';

          const label = isRanked && showResult && choice.rank
            ? RANK_LABEL[choice.rank]
            : !isRanked && showResult
              ? (isCorrect ? '✓ correct' : '✗ wrong')
              : null;

          const labelColor = isRanked && choice.rank
            ? RANK_COLOR[choice.rank]
            : isCorrect ? 'text-mentis-correct' : 'text-mentis-wrong';

          return (
            <button
              key={choice.id}
              disabled={locked}
              onClick={() => onSelect(choice.id)}
              className={`w-full text-left rounded-lg border px-4 py-3.5 transition-all duration-150
                          bg-mentis-surface cursor-pointer active:scale-[0.99] disabled:cursor-default disabled:active:scale-100
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mentis-accent/40 focus-visible:ring-offset-1 focus-visible:ring-offset-mentis-bg
                          slide-up ${borderClass}`}
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-mentis-muted mt-0.5 flex-shrink-0 w-4">
                  {choice.id.toUpperCase()}.
                </span>
                <span className="text-sm text-mentis-text leading-relaxed">{choice.text}</span>
                {label && (
                  <span className={`ml-auto flex-shrink-0 font-mono text-xs mt-0.5 ${labelColor}`}>
                    {label}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
