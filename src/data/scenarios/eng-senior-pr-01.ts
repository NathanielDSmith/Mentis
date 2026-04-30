import type { Scenario } from '../../types/scenario';

export const engSeniorPr01: Scenario = {
  id: 'eng-senior-pr-01',
  title: "You Found a Bug in the Senior's PR",
  subtitle: "The code is clean. The logic is off. And they've been here three years.",
  difficulty: 'junior',
  tags: ['engineering', 'code review', 'communication'],
  category: 'engineering',
  choicePrompt: 'What do you do?',
  actionLabel: "what's your move? →",

  context:
    "You're reviewing a PR from one of the senior engineers. The code itself looks clean — well-named, well-structured. " +
    "But you've spotted what looks like a real bug: an edge case that isn't handled, and if it hits production it could cause problems. " +
    "You're fairly confident it's an issue, not just a misunderstanding on your part.",

  revealSteps: [
    {
      content:
        "This is one of those moments where a lot of junior engineers talk themselves out of saying something. Maybe they're wrong. " +
        "Maybe the senior already thought about it. Maybe it'll cause awkwardness. All of those things can be true — and you should still say something.",
    },
  ],

  choices: [
    {
      id: 'a',
      text: "Leave a clear comment on the PR explaining what you found, why you think it's a problem, and what you'd do about it.",
      isCorrect: true,
      rank: 1,
      feedback:
        "This is the right call. PR comments are normal — that's what review is for. Being specific about what you found and why it matters makes it easy for them to engage with your concern rather than dismiss it. Framing it as a question ('I might be missing something, but...') keeps it collaborative without being mealy-mouthed.",
    },
    {
      id: 'b',
      text: "Message them directly before leaving any public comment, so it doesn't feel like a callout.",
      isCorrect: false,
      rank: 2,
      feedback:
        "A reasonable approach if you have a good relationship with them or if you're genuinely unsure whether it's actually a bug. The downside is the conversation happens outside the PR, so there's no record of the concern being raised or resolved. If you do this, follow it up with a comment on the PR once you've talked it through.",
    },
    {
      id: 'c',
      text: "Fix it yourself in a separate PR and mention it to them casually after.",
      isCorrect: false,
      rank: 3,
      feedback:
        "You're solving the bug, which is good, but you're skipping the conversation that matters. They might not know the edge case exists, which means they'll probably write it the same way again. Going around someone's PR without saying anything can also land poorly — it feels like correcting them behind their back rather than engaging directly.",
    },
    {
      id: 'd',
      text: "Let it go — they've been here for years, they've probably thought about it more than you have.",
      isCorrect: false,
      rank: 4,
      feedback:
        "Seniority doesn't make people immune to edge cases — it just means they've seen more of them. Talking yourself out of raising a real concern because of someone's title is how bugs get to production. If you're genuinely unsure whether it's a bug, ask — but don't stay quiet just because they're senior.",
    },
  ],

  feedbackLayers: [
    {
      kind: 'principle',
      heading: 'Good review is a service, not an attack',
      body:
        "Code review isn't about being right or catching people out. It's about shipping better code as a team. A junior engineer asking a genuine question on a senior's PR isn't overstepping — it's doing the job. Most experienced engineers expect to get feedback on their PRs and respect the people who engage seriously with their code.",
    },
    {
      kind: 'deepdive',
      heading: 'How to phrase it',
      body:
        "Lead with what you observed, not a verdict. Something like: 'Hey, curious about this — what happens when X is null here? I think it might hit the catch block unexpectedly. Am I reading this right?' That structure does a few things: it's specific, it's framed as a question so there's room for them to explain if you're wrong, and it invites a conversation rather than forcing a defence.",
    },
  ],
};
