import React, { createContext, useContext, useState } from 'react';
import type { PfmPocket } from './types';
import { pockets as defaultPockets } from './pfmData';

interface PocketContextType {
  pockets: PfmPocket[];
  addPocket: (pocket: PfmPocket) => void;
}

const PocketContext = createContext<PocketContextType>({
  pockets: defaultPockets,
  addPocket: () => {},
});

export const PocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pockets, setPockets] = useState<PfmPocket[]>([...defaultPockets]);

  const addPocket = (pocket: PfmPocket) => {
    setPockets(prev => [...prev, pocket]);
  };

  return (
    <PocketContext.Provider value={{ pockets, addPocket }}>
      {children}
    </PocketContext.Provider>
  );
};

export const usePockets = () => useContext(PocketContext);
