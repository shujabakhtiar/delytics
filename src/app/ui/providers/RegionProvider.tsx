'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Region } from '@/app/ui/resources/regions/regionResource';

interface RegionContextType {
  selectedRegion: Region | null;
  setRegion: (region: Region | null) => void;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedRegion = localStorage.getItem('globalRegion');
    if (savedRegion) {
      try {
        setSelectedRegion(JSON.parse(savedRegion));
      } catch (e) {
        console.error('Failed to parse saved region', e);
      }
    }
  }, []);

  const setRegion = (region: Region | null) => {
    setSelectedRegion(region);
    if (region) {
      localStorage.setItem('globalRegion', JSON.stringify(region));
    } else {
      localStorage.removeItem('globalRegion');
    }
  };

  return (
    <RegionContext.Provider value={{ selectedRegion, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
};
