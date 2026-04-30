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

const RANK_BANNER = {
  1: { classes: 'bg-green-950/50 border-green-800/60 text-green-400', icon: '✓', message: "That's the move." },
  2: { classes: 'bg-amber-950/50 border-amber-800/60 text-amber-400', icon: '~', message: "Good call, but there's a stronger play." },
  3: { classes: 'bg-amber-950/40 border-amber-900/50 text-amber-500', icon: '~', message: "Not wrong, but there's a better option here." },
  4: { classes: 'bg-red-950/50 border-red-800/60 text-red-400', icon: '✗', message: "This one tends to backfire." },
} as const;

interface Props {
  layers: FeedbackLayer[];
  visibleCount: number;
  isCorrect: boolean;
  onRevealNext: () => void;
  isComplete: boolean;
  choiceFeedback?: string;
  choiceRank?: number;
}

export default function FeedbackPanel({ layers, visibleCount, isCorrect, onRevealNext, isComplete, choiceFeedback, choiceRank }: Props) {
  const hasMore = visibleCount < layers.length - 1;
  const rankBanner = choiceRank && choiceRank in RANK_BANNER ? RANK_BANNER[choiceRank as keyof typeof RANK_BANNER] : null;

  return (
    <div className="mt-8 slide-up">
      {rankBanner ? (
        <div className={`rounded-lg px-4 py-3 mb-6 font-mono text-sm flex items-center gap-3 border ${rankBanner.classes}`}>
          <span className="text-lg">{rankBanner.icon}</span>
          <span>{rankBanner.message}</span>
        </div>
      ) : (
        <div className={`rounded-lg px-4 py-3 mb-6 font-mono text-sm flex items-center gap-3
                         ${isCorrect
                           ? 'bg-green-950/50 border border-green-800/60 text-green-400'
                           : 'bg-red-950/50 border border-red-800/60 text-red-400'}`}>
          <span className="text-lg">{isCorrect ? '✓' : '✗'}</span>
          <span>{isCorrect ? "That's it." : 'Not quite.'}</span>
        </div>
      )}

      {choiceFeedback && (
        <div className="border-l-2 border-l-mentis-accent pl-4 py-1 mb-4">
          <p className="font-mono text-xs tracking-widest uppercase mb-2 text-mentis-accent">your pick</p>
          <p className="text-mentis-muted text-sm leading-relaxed">{choiceFeedback}</p>
        </div>
      )}

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
              <h3 className="text-mentis-text/90 font-semibold text-sm mb-2">{layer.heading}</h3>
              <p className="text-mentis-muted text-sm leading-relaxed">{layer.body}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        {!isComplete && hasMore && (
          <button
            onClick={onRevealNext}
            className="font-mono text-sm text-mentis-accent border border-mentis-accent/30
                       hover:bg-mentis-accent/10 active:scale-[0.97] rounded-lg px-5 py-2.5 transition-all duration-150
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mentis-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-mentis-bg"
          >
            go deeper →
          </button>
        )}
        {!isComplete && !hasMore && (
          <button
            onClick={onRevealNext}
            className="font-mono text-sm text-mentis-accent border border-mentis-accent/30
                       hover:bg-mentis-accent/10 active:scale-[0.97] rounded-lg px-5 py-2.5 transition-all duration-150
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mentis-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-mentis-bg"
          >
            finish →
          </button>
        )}
      </div>
    </div>
  );
}
