import React, { useState } from "react";
import SubHeading from "./SubHeading";
import SubHeadingList from "./SubHeadingList";

interface IHeadingDataProps {
  id: string;
  title: string;
  description: string;
  subgroups: {
    id: string;
    title: string;
    description: string;
    problems: string[];
  }[];
}

const Heading = (headingData: IHeadingDataProps) => {
  const [showSubHeadingList, setShowSubHeadingList] = useState(false);
  // console.log(showSubHeadingList)
  return (
    <div>
      <h2
        className="text-xl py-4 cursor-pointer font-semibold hover:text-2xl transition-all duration-300"
        onClick={() => setShowSubHeadingList(prev => !prev)}
      >
        {headingData.title}
      </h2>

      {showSubHeadingList && (
        <SubHeadingList subgroups={headingData.subgroups} />
      )}
    </div>
  );
};

export default Heading;
