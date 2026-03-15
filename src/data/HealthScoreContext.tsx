import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  HealthScore,
  HouseholdHealthScore,
  PillarScore,
  MemberScore,
} from './types';
import {
  buildHealthScore,
  buildHouseholdScore,
  getDefaultHealthScore,
} from './healthScoreData';
import { budgets, accounts, cashflowSummary } from './pfmData';
import { useGoals } from './GoalContext';
import { usePockets } from './PocketContext';
import { usePersona } from './PersonaContext';

const STORAGE_KEY = 'pfm-health-score';

interface HealthScoreContextType {
  score: HealthScore;
  householdScore: HouseholdHealthScore | null;
  recalculate: () => void;
  getPillarDetail: (pillarId: string) => PillarScore | undefined;
}

function getStoredScore(): HealthScore | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return null;
}

function persistScore(score: HealthScore): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(score)); } catch { /* ignore */ }
}

const HealthScoreContext = createContext<HealthScoreContextType>({
  score: getDefaultHealthScore(),
  householdScore: null,
  recalculate: () => {},
  getPillarDetail: () => undefined,
});

export const HealthScoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { goals } = useGoals();
  const { pockets } = usePockets();
  const { personaId } = usePersona();

  const isFamily = personaId === 'family';

  const [score, setScore] = useState<HealthScore>(() => {
    const stored = getStoredScore();
    return stored || getDefaultHealthScore();
  });

  const [householdScore, setHouseholdScore] = useState<HouseholdHealthScore | null>(null);

  const recalculate = useCallback(() => {
    const newScore = buildHealthScore(budgets, pockets, goals, accounts, cashflowSummary);
    setScore(newScore);
    persistScore(newScore);

    if (isFamily) {
      const prevMonth = newScore.history.length >= 2 ? newScore.history[newScore.history.length - 2] : null;
      const overallDelta = prevMonth ? newScore.overall - prevMonth.overall : 0;
      const memberScores: MemberScore[] = [
        { name: 'Marcus', avatar: '\u{1F468}', score: newScore.overall, delta: overallDelta, role: 'adult' },
        { name: 'Lisa', avatar: '\u{1F469}', score: Math.min(100, newScore.overall + 6), delta: 3, role: 'adult' },
        { name: 'Alex', avatar: '\u{1F9D1}', score: 45, delta: 8, role: 'teen' },
      ];
      const incomeShares = [0.55, 0.45];
      const household = buildHouseholdScore(memberScores, incomeShares);
      setHouseholdScore(household);
    } else {
      setHouseholdScore(null);
    }
  }, [goals, pockets, isFamily]);

  useEffect(() => {
    recalculate();
  }, [recalculate]);

  const getPillarDetail = useCallback(
    (pillarId: string): PillarScore | undefined => {
      return score.pillars.find(p => p.id === pillarId);
    },
    [score],
  );

  return (
    <HealthScoreContext.Provider value={{ score, householdScore, recalculate, getPillarDetail }}>
      {children}
    </HealthScoreContext.Provider>
  );
};

export const useHealthScore = () => useContext(HealthScoreContext);
