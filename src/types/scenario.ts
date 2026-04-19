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

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  difficulty: 'junior' | 'mid' | 'senior';
  tags: string[];
  context: string;
  revealSteps: RevealStep[];
  choices: Choice[];
  feedbackLayers: FeedbackLayer[];
}
