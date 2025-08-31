import React, { createContext, useContext, useEffect, useState } from "react";
import { getSolvedProblemsCountByDay } from "./weeklyProgressUtils";


// Context type
interface WeeklyProgressContextType {
  problemsByDay: Record<string, number>;
  refreshWeeklyProgress: () => Promise<void>;
}

// Default
const WeeklyProgressContext = createContext<WeeklyProgressContextType | undefined>(undefined);

export const WeeklyProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [problemsByDay, setProblemsByDay] = useState<Record<string, number>>({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });

  const refreshWeeklyProgress = async () => {
    const counts = await getSolvedProblemsCountByDay(); 
    setProblemsByDay(counts);
  };

  useEffect(() => {
    refreshWeeklyProgress();
  }, []);

  return (
    <WeeklyProgressContext.Provider value={{ problemsByDay, refreshWeeklyProgress }}>
      {children}
    </WeeklyProgressContext.Provider>
  );
};

export const useWeeklyProgress = () => {
  const ctx = useContext(WeeklyProgressContext);
  if (!ctx) throw new Error("useWeeklyProgress must be used inside WeeklyProgressProvider");
  return ctx;
};
