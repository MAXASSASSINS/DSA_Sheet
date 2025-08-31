import React, { useEffect, useState } from "react";

import json from "./learnyard_sheet.json";
import Heading from "./Heading";
import { useRevision } from "./RevisionContext";




const HeadingList = () => {
  const { revisionMap, showOnlyRevisionProblem } = useRevision();
  const [problemsData, setProblemsData] = useState(json["PRACTICE_MODE"]);


  useEffect(() => {
    let data = json["PRACTICE_MODE"];

    if (showOnlyRevisionProblem) {
      const revised = data
        .map((item) => {
          const subgroups = item.subgroups
            .map((group: any) => {
              const problems = group.problems.filter(
                (id: string) => revisionMap.has(id) && revisionMap.get(id)
              );
              return problems.length > 0 ? { ...group, problems } : null;
            })
            .filter((g) => g !== null); // <-- type guard

          return subgroups.length > 0 ? { ...item, subgroups } : null;
        })
        .filter((i: any): i is typeof data[number] => i !== null);

      setProblemsData(revised);
    } else {
      setProblemsData(data);
    }
  }, [showOnlyRevisionProblem, revisionMap]);



  return (
    <div className="p-4">
      {problemsData.map((item) => (
        <Heading key={item.id} {...item} />
      ))}
    </div>
  );
};

export default HeadingList;
