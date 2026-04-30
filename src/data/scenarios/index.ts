import type { Scenario } from '../../types/scenario';
import { nodeMemoryLeak01 } from './node-memory-leak-01';
import { interviewWhiteboard01 } from './interview-whiteboard-01';
import { interviewFailure01 } from './interview-failure-01';
import { interviewTakehome01 } from './interview-takehome-01';
import { interviewQTypescript01 } from './interview-q-typescript-01';
import { engCustomerComplaint01 } from './eng-customer-complaint-01';
import { engSeniorPr01 } from './eng-senior-pr-01';
import { engFridayBreak01 } from './eng-friday-break-01';

export const scenarios: Scenario[] = [
  interviewWhiteboard01,
  interviewFailure01,
  interviewTakehome01,
  interviewQTypescript01,
  engCustomerComplaint01,
  engSeniorPr01,
  engFridayBreak01,
  nodeMemoryLeak01,
];

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}
