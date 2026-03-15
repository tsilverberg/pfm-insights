import React, { createContext, useContext, useState } from 'react';
import type { CohortProfile } from './types';

export type { CohortProfile };

const STORAGE_KEY = 'cohort-profile';

const defaultProfile: CohortProfile = {
  householdType: null,
  hasChildren: null,
  childrenCount: 0,
  incomeBand: null,
  riskAttitude: null,
  financialGoals: [],
  spendingPersonality: null,
};

function getStoredProfile(): CohortProfile {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return { ...defaultProfile };
}

interface CohortContextType {
  profile: CohortProfile;
  setProfile: (p: CohortProfile) => void;
  hasProfile: boolean;
}

const CohortContext = createContext<CohortContextType>({
  profile: defaultProfile,
  setProfile: () => {},
  hasProfile: false,
});

export const CohortProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfileState] = useState<CohortProfile>(getStoredProfile);

  const hasProfile = profile.householdType !== null;

  const setProfile = (p: CohortProfile) => {
    setProfileState(p);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch { /* ignore */ }
  };

  return (
    <CohortContext.Provider value={{ profile, setProfile, hasProfile }}>
      {children}
    </CohortContext.Provider>
  );
};

export const useCohort = () => useContext(CohortContext);
