import { useState, useCallback } from 'react';
import type { Scenario } from '../types/scenario';

export type FlowStage = 'reading' | 'answering' | 'feedback' | 'complete';

export interface ScenarioFlowState {
  stage: FlowStage;
  revealedSteps: number;
  selectedChoiceId: string | null;
  isCorrect: boolean | null;
  feedbackLayerIndex: number;
}

export function useScenarioFlow(scenario: Scenario) {
  const [state, setState] = useState<ScenarioFlowState>({
    stage: 'reading',
    revealedSteps: 0,
    selectedChoiceId: null,
    isCorrect: null,
    feedbackLayerIndex: 0,
  });

  const revealNext = useCallback(() => {
    setState((s) => {
      if (s.revealedSteps < scenario.revealSteps.length - 1) {
        return { ...s, revealedSteps: s.revealedSteps + 1 };
      }
      return { ...s, stage: 'answering' };
    });
  }, [scenario.revealSteps.length]);

  const submitAnswer = useCallback(
    (choiceId: string) => {
      const choice = scenario.choices.find((c) => c.id === choiceId);
      setState((s) => ({
        ...s,
        stage: 'feedback',
        selectedChoiceId: choiceId,
        isCorrect: choice?.isCorrect ?? false,
        feedbackLayerIndex: 0,
      }));
    },
    [scenario.choices]
  );

  const revealNextFeedback = useCallback(() => {
    setState((s) => {
      if (s.feedbackLayerIndex < scenario.feedbackLayers.length - 1) {
        return { ...s, feedbackLayerIndex: s.feedbackLayerIndex + 1 };
      }
      return { ...s, stage: 'complete' };
    });
  }, [scenario.feedbackLayers.length]);

  const reset = useCallback(() => {
    setState({
      stage: 'reading',
      revealedSteps: 0,
      selectedChoiceId: null,
      isCorrect: null,
      feedbackLayerIndex: 0,
    });
  }, []);

  return { state, revealNext, submitAnswer, revealNextFeedback, reset };
}
