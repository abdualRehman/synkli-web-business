import React from "react";
import { DimmedArrowRight } from "../../../../utills/svgs/DimmedArrowRight";
export const SecurityInfo = ({ text }) => {
  return (
    <div>
      <div className="security-info flex mt-2 gap-2">
        <div className="scale-75">
          <DimmedArrowRight />
        </div>

        <div className="mt-1">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};
