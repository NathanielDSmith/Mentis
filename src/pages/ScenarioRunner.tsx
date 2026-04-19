import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getScenarioById } from '../data/scenarios';

export default function ScenarioRunner() {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const scenario = getScenarioById(scenarioId ?? '');

  if (!scenario) {
    return (
      <div className="min-h-screen bg-mentis-bg flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-mentis-muted text-sm mb-4">scenario not found</p>
          <Link to="/" className="font-mono text-mentis-accent hover:underline text-sm">
            ← back to lab
          </Link>
        </div>
      </div>
    );
  }

  // Full implementation arrives in slice 3
  return (
    <div className="min-h-screen bg-mentis-bg text-mentis-text p-8">
      <p className="font-mono text-mentis-muted text-sm">scenario runner — slice 3</p>
    </div>
  );
}
