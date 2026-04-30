import { useEffect, useRef } from 'react';
import type { RevealStep as RevealStepType } from '../types/scenario';
import ArtifactBlock from './ArtifactBlock';
import { useTypewriter } from '../hooks/useTypewriter';

interface Props {
  step: RevealStepType;
  index: number;
  animate: boolean;
  onDone?: () => void;
}

export default function RevealStep({ step, animate, onDone }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Only animate the most-recently-revealed step; older steps show instantly
  const { displayText, isDone } = useTypewriter(step.content, 10, animate);

  useEffect(() => {
    if (isDone) onDone?.();
  }, [isDone]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (animate && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [animate]);

  const text = animate ? displayText : step.content;
  const showArtifact = animate ? isDone : true;

  return (
    <div ref={ref} className={animate ? 'slide-up' : undefined}>
      <p className="text-mentis-text/90 text-sm leading-relaxed min-h-[1.5em]">
        {text}
        {animate && !isDone && (
          <span className="ml-0.5 text-mentis-accent animate-pulse">▌</span>
        )}
      </p>
      {showArtifact && step.artifact && (
        <div className={animate ? 'fade-in' : undefined}>
          <ArtifactBlock artifact={step.artifact} />
        </div>
      )}
    </div>
  );
}
