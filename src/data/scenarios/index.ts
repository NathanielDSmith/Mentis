import { Scenario } from '../../types/scenario';

// Populated in slice 3+
export const scenarios: Scenario[] = [];

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}
