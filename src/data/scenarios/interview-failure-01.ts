import type { Scenario } from '../../types/scenario';

export const interviewFailure01: Scenario = {
  id: 'interview-failure-01',
  title: 'The Failure Question',
  subtitle: "They want to know about a time things went wrong. This one trips people up more than it should.",
  difficulty: 'junior',
  tags: ['interview', 'behavioural', 'communication'],
  category: 'interview',
  choicePrompt: 'How do you answer?',
  actionLabel: "what's your move? →",

  context:
    "The technical part of the interview went well. Then comes the curveball: 'Can you tell me about a time you failed at something?' " +
    "You have a few options. What you pick — and how you tell it — matters more than most people think.",

  revealSteps: [
    {
      content:
        "They're not trying to catch you out. They want to see if you're self-aware, if you can be honest under pressure, and whether you actually learn from things that go wrong. " +
        "The candidate who says 'I can't think of a time I've failed' is a red flag. So is the one who spends the whole answer blaming everyone else.",
    },
  ],

  choices: [
    {
      id: 'a',
      text: "Pick something real that actually stung. Walk through what happened, why it went wrong, what you learned, and what you'd do differently.",
      isCorrect: true,
      rank: 1,
      feedback:
        "This is the answer. Real failure, real reflection, real lesson. It shows self-awareness, honesty, and the ability to grow — which is exactly what they're asking about. The failure doesn't need to be dramatic. A missed deadline you misjudged, a bug that made it to production, a miscommunication that cost the team time — all of those work if you can speak to them honestly.",
    },
    {
      id: 'b',
      text: "Be honest about a significant failure, but spend most of the time on what went wrong and less on what you actually took from it.",
      isCorrect: false,
      rank: 2,
      feedback:
        "Better than deflecting, and the honesty is good. The issue is if you dwell too long on what went wrong without getting to the lesson, it can start to sound like a vent rather than a reflection. Keep the ratio roughly 40% setup, 60% what you learned and what changed as a result.",
    },
    {
      id: 'c',
      text: "Pick something small and low-stakes that didn't really affect anyone — safe ground.",
      isCorrect: false,
      rank: 3,
      feedback:
        "It's not a terrible move if you're genuinely stuck, but interviewers usually see through it. Choosing something trivial can actually make you look less self-aware, not more careful. If the 'failure' had no real consequences, it's hard to demonstrate meaningful learning from it.",
    },
    {
      id: 'd',
      text: "Reframe it — 'I sometimes care too much about quality and it slows me down.' Turn the weakness into a strength.",
      isCorrect: false,
      rank: 4,
      feedback:
        "Everyone's heard this one. It's the most tired answer in interview history and most interviewers clock it immediately. Even if it's partly true, it reads as evasive — and it signals you're not willing to be honest under mild pressure. That's actually a worse signal than the failure itself would have been.",
    },
  ],

  feedbackLayers: [
    {
      kind: 'principle',
      heading: 'Vulnerability done right',
      body:
        "The failure question is really a self-awareness question. They're not judging the failure — they're judging how you relate to it. Someone who can speak clearly and without defensiveness about something that went wrong is someone who can handle feedback, work through hard situations, and actually improve. That's who you want on a team.",
    },
    {
      kind: 'deepdive',
      heading: 'The structure that works',
      body:
        "Use something close to STAR — situation, task, action, result — but don't make it feel rehearsed. Set the context briefly, explain what you were responsible for, be specific about what you did or didn't do that contributed to the failure, and then land clearly on what changed for you after. One honest example, told well, is worth more than three polished non-answers.",
    },
  ],
};
