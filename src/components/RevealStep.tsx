import React, { useEffect, useRef } from 'react';
import type { RevealStep as RevealStepType } from '../types/scenario';
import ArtifactBlock from './ArtifactBlock';

interface Props {
  step: RevealStepType;
  index: number;
  animate: boolean;
}

export default function RevealStep({ step, animate }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animate && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [animate]);

  return (
    <div
      ref={ref}
      className={animate ? 'slide-up' : undefined}
    >
      <p className="text-mentis-text/90 text-sm leading-relaxed">{step.content}</p>
      {step.artifact && <ArtifactBlock artifact={step.artifact} />}
    </div>
  );
}
