import React, { useState } from "react";
import ProblemsList from "./ProblemsList";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

export interface ISubHeadingProps {
  id: string;
  title: string;
  description: string;
  problems: string[];
}

const SubHeading = (subHeadingData: ISubHeadingProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="cursor-pointer">
      <div
        className="flex py-4 px-2 gap-2 items-center rounded bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)]"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <IoIosArrowDown /> : <IoIosArrowForward />}
        <h3> {subHeadingData.title} </h3>
      </div>
      {open && <ProblemsList problems={subHeadingData.problems} />}
    </div>
  );
};

export default SubHeading;
