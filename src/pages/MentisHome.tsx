import { Link } from 'react-router-dom';
import { scenarios } from '../data/scenarios';
import type { Scenario } from '../types/scenario';

const DIFFICULTY_BADGE: Record<string, string> = {
  junior: 'text-emerald-400 border-emerald-800 bg-emerald-950/40',
  mid: 'text-amber-400 border-amber-800 bg-amber-950/40',
  senior: 'text-red-400 border-red-800 bg-red-950/40',
};

function ScenarioCard({ s }: { s: Scenario }) {
  return (
    <Link
      to={`/scenario/${s.id}`}
      className="group card-accent-hover block border border-mentis-border rounded-xl p-6
                 bg-mentis-surface hover:border-mentis-accent/30
                 hover:bg-mentis-surface-hover transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`font-mono text-xs px-2 py-0.5 rounded border ${DIFFICULTY_BADGE[s.difficulty]}`}>
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
          <h2 className="font-semibold text-base tracking-tight text-mentis-text group-hover:text-mentis-accent transition-colors">
            {s.title}
          </h2>
          <p className="text-mentis-muted text-sm mt-1 leading-relaxed">{s.subtitle}</p>
        </div>
        <span className="text-mentis-muted group-hover:text-mentis-accent transition-colors text-lg flex-shrink-0 mt-1">
          →
        </span>
      </div>
    </Link>
  );
}

function ScenarioSection({ title, items }: { title: string; items: Scenario[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mb-10">
      <p className="font-mono text-xs text-mentis-muted tracking-[0.2em] uppercase mb-4">{title}</p>
      <div className="grid gap-3">
        {items.map((s) => <ScenarioCard key={s.id} s={s} />)}
      </div>
    </div>
  );
}

const COMING_SOON = [
  {
    title: 'Interview Simulator',
    subtitle: 'Conversational back-and-forth with an AI interviewer. Practise staying calm when questions go sideways.',
    tags: ['interview', 'conversational'],
  },
  {
    title: 'Management and Leadership',
    subtitle: 'Difficult team conversations, performance issues, missed deadlines. Situations nobody prepares you for.',
    tags: ['leadership', 'communication'],
  },
  {
    title: 'Medical and Emergency Response',
    subtitle: 'High-stakes triage decisions under time pressure. Same engine, very different stakes.',
    tags: ['medical', 'decision-making'],
  },
];

function ComingSoon() {
  return (
    <div className="mt-4">
      <p className="font-mono text-xs text-mentis-muted tracking-[0.2em] uppercase mb-4">coming soon</p>
      <div className="grid gap-3">
        {COMING_SOON.map((item) => (
          <div
            key={item.title}
            className="block border border-dashed border-mentis-border rounded-xl p-6 bg-mentis-surface/40 opacity-50 cursor-not-allowed select-none"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="font-mono text-xs px-2 py-0.5 rounded border border-mentis-border text-mentis-muted">
                    soon
                  </span>
                  {item.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-mentis-muted border border-mentis-border rounded px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-semibold text-base tracking-tight text-mentis-text">{item.title}</h2>
                <p className="text-mentis-muted text-sm mt-1 leading-relaxed">{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MentisHome() {
  const interview = scenarios.filter((s) => s.category === 'interview');
  const engineering = scenarios.filter((s) => s.category === 'engineering');
  const other = scenarios.filter((s) => !s.category);
  const hasScenarios = scenarios.length > 0;

  return (
    <div className="min-h-screen bg-mentis-bg text-mentis-text">
      <header className="border-b border-mentis-border px-5 py-4 md:px-8 md:py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold tracking-wider text-lg text-mentis-accent">
            MENTIS
          </span>
          <span className="font-mono text-xs border border-mentis-border rounded px-2 py-0.5 text-mentis-muted">
            v0.1 · alpha
          </span>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-5 pt-14 pb-10 md:px-8 md:pt-24 md:pb-14">
        <p className="font-mono text-mentis-muted text-xs tracking-[0.2em] uppercase mb-5">
          situation trainer
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-6">
          Think it through
          <br />
          <span className="text-mentis-accent">before it happens.</span>
        </h1>
        <p className="text-mentis-muted text-base leading-relaxed font-normal">
          Real situations, four options, no easy answers. Work through how you'd respond, then see what tends to land and why.
        </p>
        <p className="text-mentis-muted text-sm leading-relaxed font-normal mt-4">
          I built this a year into my first engineering job. Day to day work is good, but it doesn't always throw you into the situations that actually test you. Mentis is for practising those moments before they happen: interviews, incidents, tough conversations with the team. No right answers, just better instincts.
        </p>
      </section>

      <section className="max-w-2xl mx-auto px-5 pb-16 md:px-8 md:pb-24">
        {!hasScenarios ? (

          <div className="border border-dashed border-mentis-border rounded-xl p-14 text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-xl border border-mentis-border bg-mentis-surface flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="8" height="6" rx="1.5" stroke="#637089" strokeWidth="1.4"/>
                <rect x="1" y="10" width="8" height="11" rx="1.5" stroke="#637089" strokeWidth="1.4"/>
                <rect x="13" y="1" width="8" height="11" rx="1.5" stroke="#637089" strokeWidth="1.4"/>
                <rect x="13" y="15" width="8" height="6" rx="1.5" stroke="#637089" strokeWidth="1.4"/>
              </svg>
            </div>
            <div>
              <p className="text-mentis-text font-semibold text-sm mb-1">No scenarios loaded</p>
              <p className="text-mentis-muted text-xs leading-relaxed max-w-xs mx-auto">
                Drop a scenario file into <code className="font-mono text-mentis-subdued bg-mentis-surface px-1.5 py-0.5 rounded">src/data/scenarios/</code> to get started.
              </p>
            </div>
          </div>
        ) : (
          <>
            <ScenarioSection title="Interview situations" items={interview} />
            <ScenarioSection title="Engineering" items={engineering} />
            <ScenarioSection title="Scenarios" items={other} />
            <ComingSoon />
          </>
        )}
      </section>
    </div>
  );
}
