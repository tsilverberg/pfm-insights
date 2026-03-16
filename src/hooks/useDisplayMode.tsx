import React, { createContext, useContext, useState, useCallback } from 'react';
import type { DisplayMode } from '../data/types';

const STORAGE_KEY = 'pfm-display-mode';

interface DisplayModeContextValue {
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
  showPoints: boolean;
}

const DisplayModeContext = createContext<DisplayModeContextValue>({
  displayMode: 'points',
  setDisplayMode: () => {},
  showPoints: true,
});

function loadMode(): DisplayMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'points' || stored === 'stress-free') return stored;
  } catch { /* noop */ }
  return 'points';
}

export const DisplayModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [displayMode, setDisplayModeState] = useState<DisplayMode>(loadMode);

  const setDisplayMode = useCallback((mode: DisplayMode) => {
    setDisplayModeState(mode);
    try { localStorage.setItem(STORAGE_KEY, mode); } catch { /* noop */ }
  }, []);

  return (
    <DisplayModeContext.Provider value={{
      displayMode,
      setDisplayMode,
      showPoints: displayMode === 'points',
    }}>
      {children}
    </DisplayModeContext.Provider>
  );
};

export function useDisplayMode() {
  return useContext(DisplayModeContext);
}
