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
    <div className={`rounded-xl border ${s.border} bg-black/50 overflow-hidden mt-4`}>
      {/* Header bar */}
      <div className="artifact-header flex items-center gap-2.5 px-4 py-2.5 border-b border-white/[0.06]">
        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.dot}`} />
        <span className={`font-mono text-xs tracking-[0.15em] uppercase ${s.labelColor}`}>
          {KIND_LABEL[artifact.kind]}
        </span>
        {artifact.label && (
          <>
            <span className="text-white/15 font-mono text-xs select-none">·</span>
            <span className={`font-mono text-xs ${s.labelColor} opacity-60 truncate`}>
              {artifact.label}
            </span>
          </>
        )}
      </div>

      {/* Content */}
      <pre
        className={`font-mono text-xs leading-loose p-5 overflow-x-auto whitespace-pre ${s.textColor}`}
      >
        {artifact.content}
      </pre>
    </div>
  );
}
