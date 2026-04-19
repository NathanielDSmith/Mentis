import React, { useEffect, useState } from 'react';
import type { Choice } from '../types/scenario';

interface Props {
  choices: Choice[];
  selectedId: string | null;
  isCorrect: boolean | null;
  onSelect: (id: string) => void;
  locked: boolean;
}

export default function ChoiceGrid({ choices, selectedId, isCorrect, onSelect, locked }: Props) {
  const [feedbackClass, setFeedbackClass] = useState('');

  useEffect(() => {
    if (isCorrect === null) return;
    const cls = isCorrect ? 'bounce-correct' : 'shake';
    setFeedbackClass(cls);
    const t = setTimeout(() => setFeedbackClass(''), 600);
    return () => clearTimeout(t);
  }, [isCorrect]);

  return (
    <div className="slide-up mt-8">
      <p className="font-mono text-xs text-mentis-muted tracking-widest uppercase mb-4">
        What's causing this?
      </p>
      <div className={`grid gap-3 ${feedbackClass}`}>
        {choices.map((choice) => {
          const isSelected = selectedId === choice.id;
          const showResult = locked && isSelected;

          let borderClass = 'border-mentis-border hover:border-mentis-accent/50 hover:bg-mentis-surface-hover';
          if (showResult && isCorrect)  borderClass = 'border-mentis-correct bg-green-950/30';
          if (showResult && !isCorrect) borderClass = 'border-mentis-wrong bg-red-950/30';
          if (locked && !isSelected)   borderClass = 'border-mentis-border opacity-40';

          return (
            <button
              key={choice.id}
              disabled={locked}
              onClick={() => onSelect(choice.id)}
              className={`w-full text-left rounded-lg border px-4 py-3.5 transition-all duration-150
                          bg-mentis-surface cursor-pointer disabled:cursor-default ${borderClass}`}
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-xs text-mentis-muted mt-0.5 flex-shrink-0 w-4">
                  {choice.id.toUpperCase()}.
                </span>
                <span className="text-sm text-mentis-text leading-relaxed">{choice.text}</span>
                {showResult && (
                  <span className={`ml-auto flex-shrink-0 font-mono text-xs mt-0.5 ${isCorrect ? 'text-mentis-correct' : 'text-mentis-wrong'}`}>
                    {isCorrect ? '✓ correct' : '✗ wrong'}
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
