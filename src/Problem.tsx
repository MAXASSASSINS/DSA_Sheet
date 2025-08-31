import React, { useEffect, useState } from "react";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import { IoMdLink } from "react-icons/io";
// ts-ignore the type error
// @ts-ignore
import {
  setFlag,
  getFlag,
  REVISION_STORE_NAME,
  COMPLETED_STORE_NAME,
  addSolvedTimestamp
} from "./mydb";
import { useCompletion } from "./CompletionContext";
import { useRevision } from "./RevisionContext";
import { useWeeklyProgress } from "./WeeklyProgressContext";

interface IProblem {
  id: string;
  title?: string;
  difficulty?: string;
  status?: string;
  problemLink?: string;
  articleLink?: string;
  tags?: string[];
  platform?: string;
  year?: number;
}

interface IProblemProps {
  problem: IProblem;
}

const difficultyColors: Record<string, string> = {
  HARD: "text-red-500",
  MEDIUM: "text-yellow-500",
  EASY: "text-green-500",
};

const Problem = ({ problem }: IProblemProps) => {
  const { refreshCounts } = useCompletion();
  const { refreshRevisionMap } = useRevision();
  const { refreshWeeklyProgress } = useWeeklyProgress();
  const [revisionChecked, setRevisionChecked] = useState(false);
  const [completionChecked, setCompletionChecked] = useState(false);

  useEffect(() => {
    (async () => {
      const revisionFlag = await getFlag(problem.id, REVISION_STORE_NAME);
      const completedFlag = await getFlag(problem.id, COMPLETED_STORE_NAME);
      setRevisionChecked(revisionFlag);
      setCompletionChecked(completedFlag);
    })();
  }, [problem.id]);

  const handleRevisionChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.checked;
    setRevisionChecked(newValue);
    await setFlag(problem.id, newValue, REVISION_STORE_NAME);
    await refreshRevisionMap();
  };

  const handleCompletionChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.checked;
    setCompletionChecked(newValue);
    await setFlag(problem.id, newValue, COMPLETED_STORE_NAME);
    await addSolvedTimestamp(problem.id);
    await refreshCounts();
    await refreshWeeklyProgress();
  };

  return (
    <div className="grid grid-cols-[1rem_1fr_6rem_4rem_4rem] justify-center gap-8 py-4 last:border-b-0 border-b">
      <input
        type="checkbox"
        className="w-4 cursor-pointer"
        checked={completionChecked}
        onChange={handleCompletionChange}
      />
      <div>{problem.title}</div>
      <div
        className={`mx-auto ${problem.difficulty
          ? difficultyColors[problem.difficulty.toUpperCase()]
          : "text-gray-400"
          }`}
      >
        {problem.difficulty ? problem.difficulty : "N/A"}
      </div>
      {problem.problemLink ? (
        <a
          href={problem.problemLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto"
        >
          {problem.problemLink.includes("leetcode") ? (
            <SiLeetcode />
          ) : problem.problemLink.includes("geeksforgeeks") ? (
            <SiGeeksforgeeks />
          ) : (
            <IoMdLink />
          )}
        </a>
      ) : (
        "N/A"
      )}
      <input
        type="checkbox"
        className="w-4 mx-auto"
        checked={revisionChecked}
        onChange={handleRevisionChange}
      />
    </div>
  );
};

export default Problem;
