# Mentis

Scenario-based reasoning trainer. You get dropped into an incident — logs, code, metrics — and have to work out what's wrong before you see the answer.

Built for drilling diagnostic thinking without memorising solutions. Swap the scenario set and it works for anything: infra incidents, code reviews, architecture decisions.

## Running it

```bash
npm install
npm run dev
```

## Adding scenarios

Scenarios live in `src/data/scenarios/`. Each one is a typed object — copy `node-memory-leak-01.ts` as a starting point.

The schema (`src/types/scenario.ts`) is the source of truth. Key fields:

- `revealSteps` — the evidence, revealed one at a time. Each step can have an attached artifact (log, code block, metrics, stack trace).
- `choices` — multiple choice, exactly one `isCorrect: true`
- `feedbackLayers` — revealed after the answer: `diagnosis`, `principle`, `deepdive`

You can also generate scenarios with an AI — paste the schema into your model of choice and describe the situation. The format is simple enough that it works well.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS · React Router

## Status

Early. One scenario so far. The scenario runner is solid; the home page will grow as more scenarios are added.
