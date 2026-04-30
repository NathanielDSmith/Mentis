import type { Scenario } from '../../types/scenario';

export const interviewTakehome01: Scenario = {
  id: 'interview-takehome-01',
  title: 'The Scope Creep Take-Home',
  subtitle: "The instructions say a few hours. Your estimate says 15-20. Something doesn't add up.",
  difficulty: 'junior',
  tags: ['interview', 'take-home', 'communication'],
  category: 'interview',
  choicePrompt: 'What do you do?',
  actionLabel: "what's your move? →",

  context:
    "You get a take-home test. The instructions are three pages long. By your estimate, doing it properly — tests, clean code, the whole thing — would take 15 to 20 hours. " +
    "They said 'a few hours should be enough.' It's due in 48 hours. Something's off.",

  revealSteps: [
    {
      content:
        "This is more common than it should be. Sometimes the company genuinely doesn't know how long it takes. Sometimes they want to see how you handle ambiguity. " +
        "Sometimes they're testing whether you'll just suffer in silence. Whatever the reason, how you respond says something about how you'd communicate on the actual job.",
    },
  ],

  choices: [
    {
      id: 'a',
      text: "Email them to clarify scope before you start — what specifically are they looking for, and what should you prioritise if you can't cover everything?",
      isCorrect: true,
      rank: 1,
      feedback:
        "This is the right move and most companies will respect it. Asking a focused scoping question shows you think before you execute — which is the exact thing they're trying to hire for. Keep it short: one or two specific questions, not a list of ten. It also opens a conversation that can work in your favour.",
    },
    {
      id: 'b',
      text: "Do as much as you can in a realistic timeframe, then submit with a short note explaining what you'd add or improve given more time.",
      isCorrect: false,
      rank: 2,
      feedback:
        "A solid fallback if you don't want to ask or don't get a response in time. It shows you can ship something real rather than nothing, and that you're aware of your own trade-offs. The note at the end is important — it shows you can communicate decisions, which is a real engineering skill.",
    },
    {
      id: 'c',
      text: "Stay up and try to get as close to complete as possible, even if it means pulling a long night.",
      isCorrect: false,
      rank: 3,
      feedback:
        "It shows commitment, but it can also produce tired, rushed work — which isn't the impression you want to leave. Most companies aren't expecting perfection, and a polished 70% solution is usually better than an exhausted 100%. Be careful with this one.",
    },
    {
      id: 'd',
      text: "Assume they want to see how you handle overload and just submit whatever fits in 4-5 hours without saying anything.",
      isCorrect: false,
      rank: 4,
      feedback:
        "The problem here is silence. If you submit something that feels incomplete without any context, they don't know if you didn't understand the brief, ran out of time, or made a deliberate call. Always communicate your reasoning. The work and the context around it are both part of the submission.",
    },
  ],

  feedbackLayers: [
    {
      kind: 'principle',
      heading: 'Asking is a skill, not a weakness',
      body:
        "A lot of junior engineers avoid asking clarifying questions because they worry it makes them look slow or unsure. The opposite is usually true. Being able to identify ambiguity and surface it early is one of the most useful things an engineer can do — it prevents hours of work going in the wrong direction. Companies that penalise you for asking a focused question probably aren't great to work for anyway.",
    },
    {
      kind: 'deepdive',
      heading: 'What the email actually looks like',
      body:
        "Keep it direct: 'Before I start, I want to make sure I'm focusing on the right things. The full brief looks like it could take 15+ hours done properly — should I prioritise the core feature and skip the bonus items, or is there a specific area you're most interested in seeing?' That's it. One short paragraph, one clear question. It shows you've read the brief, thought about the scope, and you communicate proactively.",
    },
  ],
};
