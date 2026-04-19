import React from 'react';
import type { Artifact } from '../types/scenario';

const STYLES: Record<Artifact['kind'], { border: string; dot: string; labelColor: string; textColor: string }> = {
  log: {
    border: 'border-gray-700/60',
    dot: 'bg-green-500',
    labelColor: 'text-gray-400',
    textColor: 'text-green-400/90',
  },
  stacktrace: {
    border: 'border-red-900/60',
    dot: 'bg-red-500',
    labelColor: 'text-red-400',
    textColor: 'text-red-300/80',
  },
  code: {
    border: 'border-mentis-border',
    dot: 'bg-mentis-accent',
    labelColor: 'text-mentis-muted',
    textColor: 'text-mentis-text',
  },
  metric: {
    border: 'border-blue-900/60',
    dot: 'bg-blue-400',
    labelColor: 'text-blue-400',
    textColor: 'text-blue-300/90',
  },
  terminal: {
    border: 'border-gray-700/60',
    dot: 'bg-gray-400',
    labelColor: 'text-gray-400',
    textColor: 'text-gray-300',
  },
};

const KIND_LABEL: Record<Artifact['kind'], string> = {
  log: 'LOG',
  stacktrace: 'STACK TRACE',
  code: 'CODE',
  metric: 'METRICS',
  terminal: 'TERMINAL',
};

interface Props {
  artifact: Artifact;
}

export default function ArtifactBlock({ artifact }: Props) {
  const s = STYLES[artifact.kind];

  return (
    <div className={`rounded-lg border ${s.border} bg-black/40 overflow-hidden mt-4`}>
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-white/[0.02]">
        <span className={`w-2 h-2 rounded-full ${s.dot}`} />
        <span className={`font-mono text-xs tracking-widest ${s.labelColor}`}>
          {KIND_LABEL[artifact.kind]}
        </span>
        {artifact.label && (
          <>
            <span className="text-white/10 font-mono text-xs">·</span>
            <span className={`font-mono text-xs ${s.labelColor} opacity-70 truncate`}>
              {artifact.label}
            </span>
          </>
        )}
      </div>

      {/* Content */}
      <pre
        className={`font-mono text-xs leading-relaxed p-4 overflow-x-auto whitespace-pre ${s.textColor}`}
      >
        {artifact.content}
      </pre>
    </div>
  );
}
