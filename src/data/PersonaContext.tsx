import React, { createContext, useContext, useState } from 'react';
import type { PersonaId, Persona } from './types';
import { personas } from './personas';

const STORAGE_KEY = 'pfm-persona';

function getStoredPersona(): PersonaId | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored in personas) return stored as PersonaId;
  } catch { /* localStorage unavailable */ }
  return null;
}

interface PersonaContextType {
  persona: Persona;
  personaId: PersonaId;
  setPersonaId: (id: PersonaId) => void;
  clearPersona: () => void;
  hasStoredPersona: boolean;
}

const PersonaContext = createContext<PersonaContextType>({
  persona: personas['young-adult'],
  personaId: 'young-adult',
  setPersonaId: () => {},
  clearPersona: () => {},
  hasStoredPersona: false,
});

export const PersonaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const stored = getStoredPersona();
  const [personaId, setPersonaIdState] = useState<PersonaId>(stored || 'young-adult');
  const persona = personas[personaId];

  const [hasStored, setHasStored] = useState(!!stored);

  const setPersonaId = (id: PersonaId) => {
    setPersonaIdState(id);
    setHasStored(true);
    try { localStorage.setItem(STORAGE_KEY, id); } catch { /* ignore */ }
  };

  const clearPersona = () => {
    setHasStored(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  };

  return (
    <PersonaContext.Provider value={{ persona, personaId, setPersonaId, clearPersona, hasStoredPersona: hasStored }}>
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = () => useContext(PersonaContext);
