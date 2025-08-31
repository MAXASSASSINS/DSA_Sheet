import React, { createContext, useContext, useEffect, useState } from "react";
import { countCompletedByDifficulty, countDifficulty, IDifficultyCount } from "./count";


interface CompletionContextType {
  counts: IDifficultyCount;
  refreshCounts: () => Promise<void>;
}

const CompletionContext = createContext<CompletionContextType | undefined>(
  undefined
);

export const CompletionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [counts, setCounts] = useState<IDifficultyCount>({
    EASY: 0,
    MEDIUM: 0,
    HARD: 0
  });

  const refreshCounts = async () => {
    const newCounts = await countCompletedByDifficulty();
    // console.log(newCounts)
    setCounts(newCounts);
  };

  useEffect(() => {
    refreshCounts();
  }, []);

  return (
    <CompletionContext.Provider value={{ counts, refreshCounts }}>
      {children}
    </CompletionContext.Provider>
  );
};

export const useCompletion = () => {
  const ctx = useContext(CompletionContext);
  if (!ctx) throw new Error("useCompletion must be used inside CompletionProvider");
  return ctx;
};
