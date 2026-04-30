import type { Scenario } from '../../types/scenario';

export const engCustomerComplaint01: Scenario = {
  id: 'eng-customer-complaint-01',
  title: "Monday Morning, Boss CC'd",
  subtitle: "A customer says your app lost their data. Your boss is on the thread.",
  difficulty: 'junior',
  tags: ['engineering', 'communication', 'debugging'],
  category: 'engineering',
  choicePrompt: 'What do you do first?',
  actionLabel: "what's your move? →",

  context:
    "You open your laptop Monday morning to an email from a customer. Subject: 'Your app lost my data.' Your boss is CC'd. " +
    "The email is vague — no steps to reproduce, no specifics, just frustration. You have no idea yet whether this is a real bug, user error, or something in between.",

  revealSteps: [
    {
      content:
        "The instinct is to respond immediately — your boss is watching. But a fast reply with no substance doesn't help anyone. " +
        "And going quiet while you dig in without acknowledging the customer first can feel cold. You've got a short window before someone starts wondering what you're doing.",
    },
  ],

  choices: [
    {
      id: 'a',
      text: "Check the logs, try to reproduce the issue, and reply once you have something concrete to say.",
      isCorrect: true,
      rank: 1,
      feedback:
        "Solid. If you can find something in the logs within a few minutes, your reply is immediately more useful — 'I looked into this and found X' lands far better than 'I'm looking into it.' Just don't disappear for an hour. If you haven't found anything in 15-20 minutes, send an acknowledgement and follow up when you do.",
    },
    {
      id: 'b',
      text: "Reply immediately to acknowledge the issue and let them know you're on it.",
      isCorrect: false,
      rank: 2,
      feedback:
        "Not wrong at all — responding quickly is good customer service and it shows your boss you're on it. The downside is you're committing to a follow-up you don't have yet. Make sure you actually follow through. An acknowledgement with no update an hour later is worse than no acknowledgement.",
    },
    {
      id: 'c',
      text: "Privately message your boss first to find out if they know anything before you dig in.",
      isCorrect: false,
      rank: 3,
      feedback:
        "Reasonable if your boss has context you don't — maybe they already spoke to the customer or know what changed recently. But if they knew something relevant they'd probably have said so already. Do it quickly if you do it, or just skip it and start investigating.",
    },
    {
      id: 'd',
      text: "Forward it to the team Slack channel and see who picks it up.",
      isCorrect: false,
      rank: 4,
      feedback:
        "This one's a slow-motion problem. Forwarding without owning it means it might not get picked up at all, or it gets picked up late. Your boss is CC'd and they can see you deflecting. Even if it turns out someone else needs to handle it, be the one who figures that out and hands it off deliberately — don't just drop it in the group chat and hope.",
    },
  ],

  feedbackLayers: [
    {
      kind: 'principle',
      heading: 'Investigate, then communicate',
      body:
        "The best response to a vague complaint is usually a quick investigation followed by a specific reply. Even if you can't fix it immediately, 'I checked the logs and can see what happened — here's what we're going to do' lands far better than 'we're looking into it.' Customers want to feel like someone actually looked at their problem, not just acknowledged that it exists.",
    },
    {
      kind: 'deepdive',
      heading: 'Where to look first',
      body:
        "Start with logs around the time they mentioned, filter by their user ID or session if you can. Look for errors, unexpected state changes, or anything that got rolled back. If you have feature flags or recent deploys, check whether anything changed in the relevant area. Once you have something concrete, your reply writes itself.",
    },
  ],
};
