import json from "./learnyard_sheet.json"
import { COMPLETED_STORE_NAME, getDB } from "./mydb";

export interface IDifficultyCount {
  EASY: number;
  MEDIUM: number;
  HARD: number;
}

const problemsData = json["Problems"];


export const countDifficulty = (problems: typeof problemsData): IDifficultyCount => {
  return problems.reduce(
    (acc, problem) => {
      const diff = problem.difficulty?.toUpperCase() || "THEORY";
      if (diff === "EASY") acc.EASY += 1;
      else if (diff === "MEDIUM") acc.MEDIUM += 1;
      else if (diff === "HARD") acc.HARD += 1;
      return acc;
    },
    { EASY: 0, MEDIUM: 0, HARD: 0 }
  );
};


export const countCompletedByDifficulty = async (): Promise<IDifficultyCount> => {
  const db = await getDB(); // db with both stores
  const count: IDifficultyCount = { EASY: 0, MEDIUM: 0, HARD: 0 };

  for (const problem of problemsData) {
    const completed = await db.get(COMPLETED_STORE_NAME, problem.id);
    if (completed) {
      const diff = (problem.difficulty || "THEORY").toUpperCase();
      if (diff === "EASY") count.EASY += 1;
      else if (diff === "MEDIUM") count.MEDIUM += 1;
      else if (diff === "HARD") count.HARD += 1;
    }
  }

  return count;
};


