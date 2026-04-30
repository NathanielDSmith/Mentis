import type { Scenario } from '../../types/scenario';

export const interviewWhiteboard01: Scenario = {
  id: 'interview-whiteboard-01',
  title: 'Draw It Out',
  subtitle: "The interviewer just asked you to design something you've never thought about before.",
  difficulty: 'junior',
  tags: ['interview', 'system design', 'communication'],
  category: 'interview',
  choicePrompt: 'What do you do?',
  actionLabel: "what's your move? →",

  context:
    "You're 20 minutes into a solid interview. Then they slide the marker across the table and ask you to design a real-time notification system. " +
    "You've never designed one before. The room is quiet. They've said there's no perfect answer — they just want to see how you think.",

  revealSteps: [
    {
      content:
        "The marker is in your hand. They're watching, not impatiently — just waiting to see what you do next. " +
        "This is the moment where a lot of people freeze, overcommit, or undersell themselves.",
    },
  ],

  choices: [
    {
      id: 'a',
      text: "Take a breath, admit you haven't built one before, and start asking clarifying questions — who's the user? What delivery methods? What scale are we talking?",
      isCorrect: true,
      rank: 1,
      feedback:
        "This is the move most experienced engineers make. Asking good questions before drawing anything shows you understand that design problems don't exist in a vacuum. It also buys you time to think without looking like you're stalling. Most interviewers love this — it's what they do themselves.",
    },
    {
      id: 'b',
      text: 'Start drawing immediately. Boxes, arrows, a queue, a database. Show them you can think on your feet.',
      isCorrect: false,
      rank: 2,
      feedback:
        "Not bad — it shows confidence and you might land on something reasonable. The risk is going down a path that doesn't match what they had in mind and having to backtrack. If you do dive in, narrate your thinking out loud so they can redirect you early.",
    },
    {
      id: 'c',
      text: 'Ask for two minutes to collect your thoughts before you start drawing.',
      isCorrect: false,
      rank: 3,
      feedback:
        "Totally fine to do this. A short pause to think is better than rushing into something messy. Just don't go quiet for two minutes — say something like 'give me a moment to think through this' so it's clear you're processing, not stuck.",
    },
    {
      id: 'd',
      text: "Tell them you'd normally research it properly before designing anything, and ask if you can come back to this one.",
      isCorrect: false,
      rank: 4,
      feedback:
        "This one lands poorly in most rooms. The whole point of the whiteboard question is to see how you handle uncertainty — saying you'd research it first sidesteps that entirely. It reads as avoidance rather than honesty, even if that's not your intention.",
    },
  ],

  feedbackLayers: [
    {
      kind: 'principle',
      heading: 'Questions before boxes',
      body:
        "The instinct to start drawing immediately is understandable — it feels like it shows initiative. But in system design, five minutes of clarifying questions can save you twenty minutes of drawing the wrong thing. Most interviewers are actively looking for candidates who do this. It's a signal that you've worked on real systems where requirements are never fully defined.",
    },
    {
      kind: 'deepdive',
      heading: 'What good clarifying questions sound like',
      body:
        "Don't just ask 'what scale?' — ask specifically: 'are we talking thousands of users or millions?' For a notification system you'd want to know: push vs email vs SMS, latency requirements, whether order matters, what happens if a notification fails. Each answer shapes the design differently. Walking through those questions out loud is itself part of the answer.",
    },
  ],
};
