import React, { createContext, useContext, useState } from 'react';
import type { Goal } from './types';
import { goals as initialGoals } from './pfmData';

interface GoalContextType {
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
}

const GoalContext = createContext<GoalContextType>({
  goals: [],
  addGoal: () => {},
  updateGoal: () => {},
});

export const GoalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [goals, setGoals] = useState<Goal[]>([...initialGoals]);

  const addGoal = (goal: Goal) => {
    setGoals(prev => [...prev, goal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal, updateGoal }}>
      {children}
    </GoalContext.Provider>
  );
};

export const useGoals = () => useContext(GoalContext);
