import type { Scenario } from '../../types/scenario';
import { nodeMemoryLeak01 } from './node-memory-leak-01';

export const scenarios: Scenario[] = [
  nodeMemoryLeak01,
];

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}
