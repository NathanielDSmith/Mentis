import type { Scenario } from '../../types/scenario';

export const nodeMemoryLeak01: Scenario = {
  id: 'node-memory-leak-01',
  title: 'The Service That Never Forgets',
  subtitle: 'Memory climbs 15MB/hr in production. On-call just got paged.',
  difficulty: 'mid',
  tags: ['node.js', 'memory', 'debugging'],

  context:
    "It's 2:47am. Your Node.js API has been running clean for 6 months. " +
    "Tonight the memory alert fired for the third time this week — and this time it didn't recover.",

  revealSteps: [
    {
      content:
        'You pull up the metrics dashboard. Heap usage has been climbing steadily since the last deploy on Tuesday. ' +
        'No spikes — just a slow, relentless rise. The service restarts every time it crosses 512MB.',
      artifact: {
        kind: 'metric',
        label: 'Heap Used (MB) — last 72 hours',
        content: `Tue 09:00  │  128 MB  ██
Tue 18:00  │  201 MB  ████
Wed 03:00  │  312 MB  ██████
Wed 12:00  │  418 MB  ████████
Wed 21:00  │  511 MB  ██████████ ← OOM restart
Thu 02:47  │  389 MB  ████████   ← now`,
      },
    },
    {
      content:
        "Tuesday's deploy was small — just a feature adding real-time order tracking. " +
        "You find the new code in the request handler.",
      artifact: {
        kind: 'code',
        label: 'src/handlers/orders.ts (added Tuesday)',
        language: 'typescript',
        content: `import { EventEmitter } from 'events';
const orderBus = new EventEmitter();

export async function trackOrder(req: Request, res: Response) {
  const { orderId } = req.params;

  orderBus.on('update', (event) => {
    if (event.orderId === orderId) {
      res.json({ status: event.status });
    }
  });

  // Fetch initial state while waiting for events
  const order = await db.orders.findById(orderId);
  if (order.status !== 'pending') {
    res.json({ status: order.status });
  }
}`,
      },
    },
    {
      content:
        'You check the logs around each memory spike. One line jumps out immediately.',
      artifact: {
        kind: 'log',
        label: 'app.log — Wed 21:18',
        content: `[WARN]  MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
        11 update listeners added to [EventEmitter].
        Use emitter.setMaxListeners() to increase limit.
[INFO]  POST /orders/track 200 — 12ms
[INFO]  POST /orders/track 200 — 14ms
[INFO]  POST /orders/track 200 — 11ms
[WARN]  MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
        23 update listeners added to [EventEmitter].`,
      },
    },
  ],

  choices: [
    {
      id: 'a',
      text: 'The database connection pool is being exhausted — each request opens a connection that never closes.',
      isCorrect: false,
    },
    {
      id: 'b',
      text: 'A new event listener is registered on every request but never removed, so listeners accumulate indefinitely.',
      isCorrect: true,
    },
    {
      id: 'c',
      text: 'The response object is being cached in a module-level Map, preventing garbage collection.',
      isCorrect: false,
    },
    {
      id: 'd',
      text: 'The await call suspends the handler, causing Node\'s event loop to queue requests faster than they resolve.',
      isCorrect: false,
    },
  ],

  feedbackLayers: [
    {
      kind: 'diagnosis',
      heading: 'The leak: listeners that outlive their requests',
      body:
        'Every call to `trackOrder` adds a new `"update"` listener to `orderBus` — a module-level singleton. ' +
        'The listener captures `req`, `res`, and `orderId` in its closure, keeping them alive. ' +
        "Since the listener is never removed with `orderBus.off()`, it stays in memory forever. " +
        'Node even told you: the `MaxListenersExceededWarning` at 11 listeners is the standard early-warning signal.',
    },
    {
      kind: 'principle',
      heading: 'Rule: every .on() needs a matching .off()',
      body:
        'EventEmitters are not scoped to a request lifecycle — they live as long as the object they\'re attached to. ' +
        'Any time you register a listener inside a function that runs repeatedly (a request handler, a loop, a timer), ' +
        'you must remove it when the work is done. ' +
        'The fix here is to use `orderBus.once()` for one-shot listeners, or call `orderBus.off("update", handler)` ' +
        'inside `res.on("finish", ...)` to clean up when the response closes.',
    },
    {
      kind: 'deepdive',
      heading: 'How to catch this before it pages you',
      body:
        'Three tools: (1) `emitter.listenerCount("update")` — log this on each request and watch it grow. ' +
        '(2) `process.on("warning", ...)` — Node emits a warning object with `type: "MaxListenersExceededWarning"` you can forward to your logging pipeline. ' +
        '(3) Clinic.js `clinic heapprofiler` — generates a flame graph of heap allocations that would have shown the listener closure accumulating within minutes of load testing.',
    },
  ],
};
