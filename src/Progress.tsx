import React from "react";
import json from "./learnyard_sheet.json";

import { countCompletedByDifficulty, countDifficulty } from "./count";
import { useCompletion } from "./CompletionContext";

const problemsData = json["Problems"];
const difficultyTotalCount = countDifficulty(problemsData);
console.log(difficultyTotalCount);

// const difficultyCompletedCount = await countCompletedByDifficulty();
// console.log(difficultyCompletedCount);

const total =
  difficultyTotalCount.EASY +
  difficultyTotalCount.MEDIUM +
  difficultyTotalCount.HARD;
// const totalCompleted =
//   difficultyCompletedCount.EASY +
//   difficultyCompletedCount.MEDIUM +
//   difficultyCompletedCount.HARD;

const Progress = () => {
  const { counts } = useCompletion();
  const totalCompleted = counts.EASY + counts.MEDIUM + counts.HARD;

  const data = [
    {
      difficulty: "Easy",
      total: difficultyTotalCount.EASY,
      solved: counts.EASY,
      bgColor: "bg-green-500",
    },
    {
      difficulty: "Medium",
      total: difficultyTotalCount.MEDIUM,
      solved: counts.MEDIUM,
      bgColor: "bg-yellow-500",
    },
    {
      difficulty: "Hard",
      total: difficultyTotalCount.HARD,
      solved: counts.HARD,
      bgColor: "bg-red-500",
    },
  ];

  return (
    <div className="bg-[rgba(255,255,255,0.1)] rounded py-6 px-4">
      <div className="text-xl font-bold">Progress</div>
      <div className="flex items-center gap-4 mb-4">
        <div className="text-4xl font-bold">
          {Math.round((totalCompleted) / total).toFixed(2)}%
        </div>
        <div className="flex flex-col gap-0 leading-0 text-sm">
          <span>Total</span>
          <span>Problems</span>
        </div>
      </div>

      <div className="gap-4 flex flex-col">
        {data.map((item) => (
          <div>
            <div className="flex justify-between gap-4">
              <div>{item.difficulty}</div>
              <div>
                {item.solved}/ {item.total}
              </div>
            </div>
            <div className="h-1.5 w-full rounded-sm bg-gray-400">
              <div
                style={{ width: `${(item.solved / item.total) * 100}%` }}
                className={`h-1.5 rounded-sm ${item.bgColor}`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
