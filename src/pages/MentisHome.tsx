import React from 'react';
import { Link } from 'react-router-dom';
import { scenarios } from '../data/scenarios';

const DIFFICULTY_BADGE: Record<string, string> = {
  junior: 'text-emerald-400 border-emerald-800 bg-emerald-950/40',
  mid: 'text-amber-400 border-amber-800 bg-amber-950/40',
  senior: 'text-red-400 border-red-800 bg-red-950/40',
};

export default function MentisHome() {
  return (
    <div className="min-h-screen bg-mentis-bg text-mentis-text">
      <header className="border-b border-mentis-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold tracking-wider text-lg text-mentis-accent">
            MENTIS
          </span>
          <span className="font-mono text-xs border border-mentis-border rounded px-2 py-0.5 text-mentis-muted">
            v0.1 · alpha
          </span>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-6 pt-20 pb-12">
        <p className="font-mono text-mentis-accent text-xs tracking-[0.2em] uppercase mb-4">
          scenario-based reasoning trainer
        </p>
        <h1 className="text-4xl font-bold leading-tight mb-5">
          Debug under pressure.
          <br />
          <span className="text-mentis-accent">Think clearly.</span>
        </h1>
        <p className="text-mentis-muted text-base leading-relaxed">
          Each scenario drops you into a live incident. Read the evidence, pick your
          diagnosis, then receive layered feedback that builds your mental model —
          not just tells you the answer.
        </p>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-20">
        {scenarios.length === 0 ? (
          <div className="border border-dashed border-mentis-border rounded-xl p-12 text-center">
            <p className="font-mono text-mentis-muted text-sm">no scenarios loaded yet</p>
            <p className="font-mono text-mentis-muted/50 text-xs mt-2">
              coming in slice 3
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {scenarios.map((s) => (
              <Link
                key={s.id}
                to={`/scenario/${s.id}`}
                className="group block border border-mentis-border rounded-xl p-5
                           bg-mentis-surface hover:border-mentis-accent/40
                           hover:bg-mentis-surface-hover transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className={`font-mono text-xs px-2 py-0.5 rounded border ${DIFFICULTY_BADGE[s.difficulty]}`}
                      >
                        {s.difficulty}
                      </span>
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs text-mentis-muted border border-mentis-border rounded px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-semibold text-base text-mentis-text group-hover:text-mentis-accent transition-colors">
                      {s.title}
                    </h2>
                    <p className="text-mentis-muted text-sm mt-1 leading-relaxed">
                      {s.subtitle}
                    </p>
                  </div>
                  <span className="text-mentis-muted group-hover:text-mentis-accent transition-colors text-lg flex-shrink-0 mt-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
