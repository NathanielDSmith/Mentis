import React from 'react';
import type { FeedbackLayer } from '../types/scenario';

const KIND_STYLES: Record<FeedbackLayer['kind'], { border: string; label: string; labelColor: string }> = {
  diagnosis: {
    border: 'border-l-mentis-accent',
    label: 'DIAGNOSIS',
    labelColor: 'text-mentis-accent',
  },
  principle: {
    border: 'border-l-amber-500',
    label: 'PRINCIPLE',
    labelColor: 'text-amber-400',
  },
  deepdive: {
    border: 'border-l-blue-500',
    label: 'DEEP DIVE',
    labelColor: 'text-blue-400',
  },
};

interface Props {
  layers: FeedbackLayer[];
  visibleCount: number;
  isCorrect: boolean;
  onRevealNext: () => void;
  isComplete: boolean;
}

export default function FeedbackPanel({ layers, visibleCount, isCorrect, onRevealNext, isComplete }: Props) {
  const hasMore = visibleCount < layers.length - 1;

  return (
    <div className="mt-8 slide-up">
      {/* Result banner */}
      <div className={`rounded-lg px-4 py-3 mb-6 font-mono text-sm flex items-center gap-3
                       ${isCorrect
                         ? 'bg-green-950/50 border border-green-800/60 text-green-400'
                         : 'bg-red-950/50 border border-red-800/60 text-red-400'}`}>
        <span className="text-lg">{isCorrect ? '✓' : '✗'}</span>
        <span>{isCorrect ? 'Correct diagnosis.' : 'Not quite — here\'s what was actually happening.'}</span>
      </div>

      {/* Feedback layers */}
      <div className="grid gap-4">
        {layers.slice(0, visibleCount + 1).map((layer, i) => {
          const s = KIND_STYLES[layer.kind];
          return (
            <div
              key={i}
              className={`border-l-2 ${s.border} pl-4 py-1 ${i === visibleCount ? 'slide-up' : ''}`}
            >
              <p className={`font-mono text-xs tracking-widest uppercase mb-2 ${s.labelColor}`}>
                {s.label}
              </p>
              <h3 className="text-mentis-text font-semibold text-sm mb-2">{layer.heading}</h3>
              <p className="text-mentis-muted text-sm leading-relaxed">{layer.body}</p>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-6">
        {!isComplete && hasMore && (
          <button
            onClick={onRevealNext}
            className="font-mono text-sm text-mentis-accent border border-mentis-accent/30
                       hover:bg-mentis-accent/10 rounded-lg px-5 py-2.5 transition-all duration-150"
          >
            go deeper →
          </button>
        )}
        {!isComplete && !hasMore && (
          <button
            onClick={onRevealNext}
            className="font-mono text-sm text-mentis-accent border border-mentis-accent/30
                       hover:bg-mentis-accent/10 rounded-lg px-5 py-2.5 transition-all duration-150"
          >
            finish →
          </button>
        )}
      </div>
    </div>
  );
}
