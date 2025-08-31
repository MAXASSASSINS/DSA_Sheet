import React from "react";
import json from "./learnyard_sheet.json";
import Problem from "./Problem";
import { useRevision } from "./RevisionContext";

const problemsData = json["Problems"];

interface IProblemsListProps {
  problems: string[]; // array of problem ids
}

const ProblemsList = (props: IProblemsListProps) => {
  const { revisionMap, showOnlyRevisionProblem } = useRevision();

  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-[1fr_6rem_4rem_4rem] gap-8">
        <span>Problem</span>
        <span className="mx-auto">Difficulty</span>
        <span className="mx-auto">Practice</span>
        <span className="mx-auto">Revision</span>
      </div>
      {props.problems.filter((id) => !showOnlyRevisionProblem || revisionMap.get(id)).map((id, index) => {
        const problem = problemsData.find((p) => p.id === id);
        return problem && <Problem key={problem.id} problem={problem} />;
      })}
    </div>
  );
};

export default ProblemsList;
