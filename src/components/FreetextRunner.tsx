import { useState } from 'react';
import type { Scenario, FeedbackLayer, Keyword } from '../types/scenario';

const KIND_STYLES: Record<FeedbackLayer['kind'], { border: string; label: string; labelColor: string }> = {
  diagnosis: { border: 'border-l-mentis-accent', label: 'DIAGNOSIS', labelColor: 'text-mentis-accent' },
  principle: { border: 'border-l-amber-500', label: 'PRINCIPLE', labelColor: 'text-amber-400' },
  deepdive: { border: 'border-l-blue-500', label: 'DEEP DIVE', labelColor: 'text-blue-400' },
};

const MIN_CHARS = 60;

function checkKeywords(answer: string, keywords: Keyword[]): Map<Keyword, boolean> {
  const lower = answer.toLowerCase();
  const results = new Map<Keyword, boolean>();
  for (const kw of keywords) {
    results.set(kw, kw.variants.some((v) => lower.includes(v.toLowerCase())));
  }
  return results;
}

interface Props {
  scenario: Scenario;
}

export default function FreetextRunner({ scenario }: Props) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedbackIndex, setFeedbackIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  const keywords = scenario.keywords ?? [];
  const results = submitted ? checkKeywords(answer, keywords) : null;

  const required = keywords.filter((k) => k.weight === 'required');
  const bonus = keywords.filter((k) => k.weight === 'bonus');
  const requiredHits = results ? required.filter((k) => results.get(k)).length : 0;
  const allRequiredHit = requiredHits === required.length;

  function handleSubmit() {
    if (answer.trim().length < MIN_CHARS) return;
    setSubmitted(true);
  }

  function handleNext() {
    if (feedbackIndex < scenario.feedbackLayers.length - 1) {
      setFeedbackIndex((i) => i + 1);
    } else {
      setComplete(true);
    }
  }

  return (
    <div className="grid gap-8">
      {/* Question */}
      <div className="border-l-2 border-l-mentis-accent pl-4 py-1">
        <p className="font-mono text-xs text-mentis-accent tracking-widest uppercase mb-3">interview question</p>
        <p className="text-mentis-text text-base leading-relaxed font-medium">
          {scenario.question}
        </p>
      </div>

      {/* Input */}
      {!submitted && (
        <div className="slide-up">
          <p className="font-mono text-xs text-mentis-muted tracking-widest uppercase mb-3">your answer</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type out how you'd answer this. Don't overthink it — write like you'd actually speak."
            rows={6}
            className="w-full bg-mentis-surface border border-mentis-border rounded-lg px-4 py-3
                       text-sm text-mentis-text placeholder:text-mentis-muted/50 leading-relaxed
                       focus:outline-none focus:ring-2 focus:ring-mentis-accent/40 focus:border-mentis-accent/40
                       resize-none transition-colors duration-150"
          />
          <div className="flex items-center justify-between mt-3">
            <span className={`font-mono text-xs ${answer.length < MIN_CHARS ? 'text-mentis-muted' : 'text-mentis-accent'}`}>
              {answer.length < MIN_CHARS ? `${MIN_CHARS - answer.length} more characters to go` : 'looks good'}
            </span>
            <button
              onClick={handleSubmit}
              disabled={answer.trim().length < MIN_CHARS}
              className="font-mono text-sm bg-mentis-accent hover:bg-mentis-accent-dim active:scale-[0.97] text-white
                         rounded-lg px-6 py-2.5 transition-all duration-150 font-medium
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mentis-accent/50"
            >
              submit
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {submitted && results && (
        <div className="slide-up grid gap-6">
          {/* Score banner */}
          <div className={`rounded-lg px-4 py-3 font-mono text-sm flex items-center gap-3 border
                           ${allRequiredHit
                             ? 'bg-green-950/50 border-green-800/60 text-green-400'
                             : requiredHits > 0
                               ? 'bg-amber-950/50 border-amber-800/60 text-amber-400'
                               : 'bg-red-950/50 border-red-800/60 text-red-400'}`}>
            <span className="text-lg">{allRequiredHit ? '✓' : requiredHits > 0 ? '~' : '✗'}</span>
            <span>
              {allRequiredHit
                ? 'Strong answer. You covered the key ground.'
                : requiredHits > 0
                  ? 'Decent start, but a few things worth adding.'
                  : "Missed some of the important stuff. Worth reviewing."}
            </span>
          </div>

          {/* Keyword breakdown */}
          <div>
            <p className="font-mono text-xs text-mentis-muted tracking-widest uppercase mb-3">what you covered</p>
            <div className="grid gap-2">
              {required.map((kw) => {
                const hit = results.get(kw);
                return (
                  <div key={kw.label} className={`rounded-lg px-4 py-3 border text-sm flex items-start gap-3
                                                   ${hit ? 'border-green-800/40 bg-green-950/20' : 'border-mentis-border bg-mentis-surface'}`}>
                    <span className={`font-mono text-xs mt-0.5 flex-shrink-0 ${hit ? 'text-green-400' : 'text-mentis-muted'}`}>
                      {hit ? '✓' : '○'}
                    </span>
                    <div>
                      <p className={`font-medium text-sm ${hit ? 'text-mentis-text' : 'text-mentis-muted'}`}>{kw.label}</p>
                      {!hit && <p className="text-mentis-muted text-xs mt-1 leading-relaxed">{kw.hint}</p>}
                    </div>
                  </div>
                );
              })}
              {bonus.map((kw) => {
                const hit = results.get(kw);
                if (!hit) return null;
                return (
                  <div key={kw.label} className="rounded-lg px-4 py-3 border border-mentis-accent/20 bg-mentis-accent/5 text-sm flex items-start gap-3">
                    <span className="font-mono text-xs mt-0.5 flex-shrink-0 text-mentis-accent">+</span>
                    <div>
                      <p className="font-medium text-sm text-mentis-text">{kw.label}</p>
                      <p className="text-mentis-muted text-xs mt-0.5">bonus — nice touch</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback layers */}
          <div className="grid gap-4">
            {scenario.feedbackLayers.slice(0, feedbackIndex + 1).map((layer, i) => {
              const s = KIND_STYLES[layer.kind];
              return (
                <div key={i} className={`border-l-2 ${s.border} pl-4 py-1 ${i === feedbackIndex ? 'slide-up' : ''}`}>
                  <p className={`font-mono text-xs tracking-widest uppercase mb-2 ${s.labelColor}`}>{s.label}</p>
                  <h3 className="text-mentis-text/90 font-semibold text-sm mb-2">{layer.heading}</h3>
                  <p className="text-mentis-muted text-sm leading-relaxed">{layer.body}</p>
                </div>
              );
            })}
          </div>

          {!complete && (
            <div>
              <button
                onClick={handleNext}
                className="font-mono text-sm text-mentis-accent border border-mentis-accent/30
                           hover:bg-mentis-accent/10 active:scale-[0.97] rounded-lg px-5 py-2.5 transition-all duration-150
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mentis-accent/40"
              >
                {feedbackIndex < scenario.feedbackLayers.length - 1 ? 'go deeper →' : 'finish →'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
