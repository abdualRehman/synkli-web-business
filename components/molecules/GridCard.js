import React from "react";
import { CalenderIcon } from "utills/svgs/CalenderIcon";
import { TailArrowRight } from "utills/svgs/TailArrowRight";

export const GridCard = ({ text, atClick }) => {
  return (
    <div>
      {" "}
      <div onClick={atClick} className="settings-card p-3">
        <div className="flex justify-end items-start">
          <TailArrowRight />
        </div>
        <div className="">
          <CalenderIcon />
        </div>

        <div className="mt-2">
          <label>{text}</label>
        </div>
      </div>
    </div>
  );
};
