export type ArtifactKind = 'log' | 'stacktrace' | 'code' | 'metric' | 'terminal';

export interface Artifact {
  kind: ArtifactKind;
  label?: string;
  content: string;
  language?: string;
}

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  rank?: 1 | 2 | 3 | 4;
  feedback?: string;
}

export interface FeedbackLayer {
  heading: string;
  body: string;
  kind: 'diagnosis' | 'principle' | 'deepdive';
}

export interface RevealStep {
  content: string;
  artifact?: Artifact;
}

export interface Keyword {
  label: string;
  variants: string[];
  weight: 'required' | 'bonus';
  hint: string;
}

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  difficulty: 'junior' | 'mid' | 'senior';
  tags: string[];
  category?: 'interview' | 'engineering';
  mode?: 'choice' | 'freetext';
  choicePrompt?: string;
  actionLabel?: string;
  context: string;
  revealSteps: RevealStep[];
  choices: Choice[];
  feedbackLayers: FeedbackLayer[];
  question?: string;
  keywords?: Keyword[];
}
