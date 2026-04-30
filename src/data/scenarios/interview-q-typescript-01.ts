import type { Scenario } from '../../types/scenario';

export const interviewQTypescript01: Scenario = {
  id: 'interview-q-typescript-01',
  title: "TypeScript After a Year",
  subtitle: "Sounds easy. Most people give a surface-level answer.",
  difficulty: 'junior',
  tags: ['interview', 'typescript', 'open-ended'],
  category: 'interview',
  mode: 'freetext',

  question: "You've been working with TypeScript for about a year now. What's something about it that actually changed the way you write code?",

  keywords: [
    {
      label: 'Catching errors earlier',
      variants: ['error', 'errors', 'catch', 'caught', 'mistake', 'bug', 'bugs'],
      weight: 'required',
      hint: "Mentioning how TypeScript surfaces problems before runtime is one of the strongest things you can say. It shows you understand the actual value of the type system.",
    },
    {
      label: 'A specific feature',
      variants: ['interface', 'type alias', 'generic', 'generics', 'union', 'intersection', 'enum', 'utility type', 'readonly', 'narrowing'],
      weight: 'required',
      hint: "Being specific about which part of TypeScript you actually use shows you work with it day to day, not just know it exists. Pick one thing and talk about it.",
    },
    {
      label: 'Confidence refactoring',
      variants: ['refactor', 'refactoring', 'confident', 'confidence', 'safe', 'safely', 'change'],
      weight: 'bonus',
      hint: "Talking about how types give you confidence when changing code is a strong signal. It shows you think about maintenance, not just first-pass correctness.",
    },
    {
      label: 'A concrete example',
      variants: ['example', 'project', 'built', 'worked on', 'i was', 'when i', 'we had', 'i had'],
      weight: 'bonus',
      hint: "A real example from something you actually built is worth more than a general answer. Even a small one.",
    },
    {
      label: 'Team or readability benefit',
      variants: ['team', 'readable', 'colleague', 'read', 'someone else', 'other people', 'documentation', 'self-documenting'],
      weight: 'bonus',
      hint: "Mentioning the benefit for other people on the team shows you think beyond your own workflow.",
    },
  ],

  context: '',
  revealSteps: [],
  choices: [],

  feedbackLayers: [
    {
      kind: 'principle',
      heading: 'Specific beats general every time',
      body: "The weak version of this answer is 'I like that it catches errors.' The strong version names a specific feature, ties it to something real, and shows how it changed your thinking. If you can say 'before this I would have missed X, now the compiler catches it before I even run anything' — that's the answer they're looking for.",
    },
    {
      kind: 'deepdive',
      heading: 'What makes this question tricky',
      body: "It sounds easy but most junior engineers give a generic answer because they haven't thought about it beyond the surface level. The interviewer is checking whether you actually reflect on the tools you use. The best answers are personal. They come from something you noticed, not something you read. If you've got a moment where TypeScript actually saved you or changed how you approached a problem, that's your answer.",
    },
  ],
};
