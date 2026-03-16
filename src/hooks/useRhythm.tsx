import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { RhythmTarget, Pocket } from '../data/types';
import { pocketsListData } from '../data/mockData';
import { calculateRhythmImpact, calculateWealthProjection, calculateRequiredGrowthPct } from '../data/pfmData';

interface RhythmContextValue {
  rhythmTarget: RhythmTarget | null;
  setRhythmTarget: (target: RhythmTarget | null) => void;
  priorities: Pocket[];
  setPriorities: React.Dispatch<React.SetStateAction<Pocket[]>>;
  addPriority: (p: Pocket) => void;
  removePriority: (id: string) => void;
  updatePriority: (id: string, updates: Partial<Pocket>) => void;
  rhythmImpact: ReturnType<typeof calculateRhythmImpact> | null;
  wealthProjection: ReturnType<typeof calculateWealthProjection> | null;
  requiredGrowthPct: number;
  totalMonthlyContribution: number;
}

const RhythmContext = createContext<RhythmContextValue | null>(null);

export const RhythmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rhythmTarget, setRhythmTargetState] = useState<RhythmTarget | null>(() => {
    try {
      const saved = localStorage.getItem('pfm-rhythm-target');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [priorities, setPriorities] = useState<Pocket[]>(() => {
    try {
      const saved = localStorage.getItem('pfm-priorities');
      return saved ? JSON.parse(saved) : [...pocketsListData];
    } catch { return [...pocketsListData]; }
  });

  const setRhythmTarget = useCallback((target: RhythmTarget | null) => {
    setRhythmTargetState(target);
    if (target) {
      localStorage.setItem('pfm-rhythm-target', JSON.stringify(target));
    } else {
      localStorage.removeItem('pfm-rhythm-target');
    }
  }, []);

  const addPriority = useCallback((p: Pocket) => {
    setPriorities(prev => {
      const next = [...prev, p];
      localStorage.setItem('pfm-priorities', JSON.stringify(next));
      return next;
    });
  }, []);

  const removePriority = useCallback((id: string) => {
    setPriorities(prev => {
      const next = prev.filter(p => p.id !== id);
      localStorage.setItem('pfm-priorities', JSON.stringify(next));
      return next;
    });
  }, []);

  const updatePriority = useCallback((id: string, updates: Partial<Pocket>) => {
    setPriorities(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...updates } : p);
      localStorage.setItem('pfm-priorities', JSON.stringify(next));
      return next;
    });
  }, []);

  const rhythmImpact = useMemo(
    () => rhythmTarget ? calculateRhythmImpact(rhythmTarget) : null,
    [rhythmTarget]
  );

  const wealthProjection = useMemo(
    () => rhythmTarget ? calculateWealthProjection(rhythmTarget) : null,
    [rhythmTarget]
  );

  const requiredGrowthPct = useMemo(
    () => calculateRequiredGrowthPct(priorities),
    [priorities]
  );

  const totalMonthlyContribution = useMemo(
    () => priorities.reduce((sum, p) => sum + (p.monthlyContribution || 0), 0),
    [priorities]
  );

  const value = useMemo(() => ({
    rhythmTarget,
    setRhythmTarget,
    priorities,
    setPriorities,
    addPriority,
    removePriority,
    updatePriority,
    rhythmImpact,
    wealthProjection,
    requiredGrowthPct,
    totalMonthlyContribution,
  }), [rhythmTarget, setRhythmTarget, priorities, addPriority, removePriority, updatePriority, rhythmImpact, wealthProjection, requiredGrowthPct, totalMonthlyContribution]);

  return <RhythmContext.Provider value={value}>{children}</RhythmContext.Provider>;
};

export function useRhythm(): RhythmContextValue {
  const ctx = useContext(RhythmContext);
  if (!ctx) throw new Error('useRhythm must be used within a RhythmProvider');
  return ctx;
}
