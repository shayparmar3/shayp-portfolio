"use client";

import React, { createContext, useState, ReactNode } from "react";

export interface FishData {
  label: string;
  icon: string;
}

interface CaughtFishContextType {
  caughtFish: FishData[];
  addCaughtFish: (fish: FishData) => void;
}

export const CaughtFishContext = createContext<CaughtFishContextType>({
  caughtFish: [],
  addCaughtFish: () => {},
});

export const CaughtFishProvider = ({ children }: { children: ReactNode }) => {
  const [caughtFish, setCaughtFish] = useState<FishData[]>([]);

  const addCaughtFish = (fish: FishData) => {
    setCaughtFish((prev) => {
      // Prevent duplicates
      if (prev.some((f) => f.label === fish.label)) return prev;
      return [...prev, fish];
    });
  };

  return (
    <CaughtFishContext.Provider value={{ caughtFish, addCaughtFish }}>
      {children}
    </CaughtFishContext.Provider>
  );
};
