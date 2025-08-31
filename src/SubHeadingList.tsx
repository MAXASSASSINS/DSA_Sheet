import React from "react";
import SubHeading from "./SubHeading";

import { ISubHeadingProps } from "./SubHeading";

interface ISubHeadingListData {
  subgroups: ISubHeadingProps[];
}

const SubHeadingList = ({subgroups}: ISubHeadingListData) => {
  return (
    <div className="flex flex-col gap-4 py-4">
      {subgroups.map((group, index) => (
        <SubHeading key={index} {...group} />
      ))}
    </div>
  );
};

export default SubHeadingList;
