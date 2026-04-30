import type { Scenario } from '../../types/scenario';

export const nodeMemoryLeak01: Scenario = {
  id: 'node-memory-leak-01',
  title: 'The Service That Never Forgets',
  subtitle: 'Memory climbs 15MB/hr in production. On-call just got paged.',
  difficulty: 'mid',
  tags: ['node.js', 'memory', 'debugging'],

  context:
    "2:47am. The memory alert fired again — third time this week. " +
    "This time the service didn't recover on its own. Node.js API, been running fine for six months until Tuesday's deploy.",

  revealSteps: [
    {
      content:
        'Metrics dashboard. Heap usage has been climbing since Tuesday\'s deploy — no spikes, just a slow grind upward. ' +
        'The service is restarting every time it crosses 512MB.',
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
        'You pull the logs around the restart windows.',
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
      heading: 'Listeners that outlive their requests',
      body:
        'Every call to `trackOrder` registers a new `"update"` listener on `orderBus`, which is a module-level singleton. ' +
        'Each listener closes over `req`, `res`, and `orderId` — so none of it gets garbage collected. ' +
        'Node was already warning you: `MaxListenersExceededWarning` fires at 11 listeners by default. ' +
        'By the time it paged you there were 23.',
    },
    {
      kind: 'principle',
      heading: 'Every .on() needs a matching .off()',
      body:
        'EventEmitters live as long as the object they\'re attached to — they have no concept of a request lifecycle. ' +
        'Register a listener inside something that runs on every request and you\'ve got a leak. ' +
        '`orderBus.once()` would have fixed this one. For anything more complex, clean up inside `res.on("finish", ...)` ' +
        'so the handler is removed when the response closes, regardless of how it exits.',
    },
    {
      kind: 'deepdive',
      heading: 'Catching it before it pages you',
      body:
        'Log `emitter.listenerCount("update")` on each request — a climbing number is the tell. ' +
        'You can also pipe `process.on("warning", ...)` into your logging stack; Node emits a structured warning object with `type: "MaxListenersExceededWarning"` that most pipelines will surface. ' +
        'If you want a heap-level view, `clinic heapprofiler` will show the listener closures accumulating in a flame graph after a few minutes of load.',
    },
  ],
};
