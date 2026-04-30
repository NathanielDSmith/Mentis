import type { Scenario } from '../../types/scenario';

export const engFridayBreak01: Scenario = {
  id: 'eng-friday-break-01',
  title: "Something Broke. It's Friday.",
  subtitle: "Users are reporting errors. It's 4pm. The team starts logging off in an hour.",
  difficulty: 'junior',
  tags: ['engineering', 'incident', 'debugging'],
  category: 'engineering',
  choicePrompt: 'First thing you do?',
  actionLabel: "what's your move? →",

  context:
    "Friday, 4:07pm. A teammate pings you — something's broken. Users are reporting errors. " +
    "You have no idea yet what caused it, how bad it is, or how many people are affected. The rest of the team is winding down and will be gone in an hour.",

  revealSteps: [
    {
      content:
        "The instinct is to either panic and start reverting things, or to downplay it and hope it goes away. Neither of those tends to go well. " +
        "The first thing you actually need is information — you can't make good decisions without knowing what you're dealing with.",
    },
  ],

  choices: [
    {
      id: 'a',
      text: "Find out what's actually broken before doing anything else — is it production? How many users? What changed recently?",
      isCorrect: true,
      rank: 1,
      feedback:
        "This is the right first move. You can't fix something you don't understand, and acting without triage often makes things worse. A two-minute check of logs, error rates, and recent deploys gives you enough to know whether this is a 'stay late and fix it' situation or a 'monitor overnight and patch tomorrow' one. Triage first, always.",
    },
    {
      id: 'b',
      text: "Start rolling back the last deploy — that's almost always the culprit.",
      isCorrect: false,
      rank: 2,
      feedback:
        "A fast rollback can be the right call — and if you already know a deploy went out recently and the timing lines up, it's worth considering early. The risk is rolling back something that isn't actually the problem and either causing a different issue or just delaying the fix. Try to confirm it's the likely cause before pulling the trigger.",
    },
    {
      id: 'c',
      text: "Immediately ping the whole team and escalate — everyone should know about this.",
      isCorrect: false,
      rank: 3,
      feedback:
        "Communication matters, but escalating before you know the scope can cause unnecessary panic and drag people into something you could handle yourself in 20 minutes. Get a basic read on severity first. If it's serious, then absolutely loop people in. If it's minor, a well-timed update after you've fixed it is fine.",
    },
    {
      id: 'd',
      text: "Try to quietly fix it yourself before anyone else notices it's happening.",
      isCorrect: false,
      rank: 4,
      feedback:
        "The impulse to handle it quietly is understandable but usually backfires. If it gets worse, or if someone finds out you knew and said nothing, it creates a trust problem. Most teams want to know about production issues as they're happening, even if you're already on it. A quick 'I'm looking at this' keeps everyone in the loop without making it a big deal.",
    },
  ],

  feedbackLayers: [
    {
      kind: 'principle',
      heading: 'Triage before action',
      body:
        "In an incident, the most dangerous thing you can do is act on assumptions. A two-minute triage — what's broken, how many users, what changed — costs almost nothing and prevents a lot of friendly fire. Once you know the scope, your decisions get a lot clearer. Is this a rollback situation? A hotfix? A monitor-and-fix-Monday? You can't answer that without the facts.",
    },
    {
      kind: 'deepdive',
      heading: 'What a fast triage looks like',
      body:
        "Check error rates in your monitoring tool — is this a spike or a flat line? Pull recent deploy history — did anything go out in the last few hours? Check logs filtered to the error being reported — is it one endpoint, one user type, one region? Five minutes of this gives you enough to make a decision and communicate clearly to your team. 'It's the payment endpoint, started after today's 3pm deploy, affecting about 15% of checkout attempts' is a very different situation from 'something's broken.'",
    },
  ],
};
