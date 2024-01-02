import React from "react";
import { ProgressIcon } from "utills/svgs/ProgressIcon";
import { RedClock } from "utills/svgs/RedClock";
import { ReportsListIcon } from "utills/svgs/ReportsListIcon";
import { YellowClock } from "utills/svgs/YellowClock";

export const NumberCards = () => {
  return (
    <div className="md:mx-10 mx-5 mt-5">
      <div className="grid md:grid-cols-4 grid-cols-2 gap-5">
        <div className="reports-card-strip flex gap-2 items-center">
          <div>
            <ReportsListIcon />
          </div>
          <div className="flex  gap-1 flex-col">
            <div className="profile-number-card-title">Tasks Assigned</div>
            <div className="profile-number-card-number">500</div>
          </div>
        </div>
        <div className="reports-card-strip-one flex gap-2 items-center">
          <div>
            <YellowClock />
          </div>
          <div className="flex  gap-1 flex-col">
            <div className="profile-number-card-title">Tasks Assigned</div>
            <div className="profile-number-card-number">500</div>
          </div>
        </div>

        <div className="reports-card-strip-two flex gap-2 items-center">
          <div>
            <RedClock />
          </div>
          <div className="flex  gap-1 flex-col">
            <div className="profile-number-card-title">Tasks Assigned</div>
            <div className="profile-number-card-number">500</div>
          </div>
        </div>
        <div className="reports-card-strip-three flex gap-2 items-center">
          <div>
            <ProgressIcon />
          </div>
          <div className="flex  gap-1 flex-col">
            <div className="profile-number-card-title">Tasks Assigned</div>
            <div className="profile-number-card-number">500</div>
          </div>
        </div>
      </div>
    </div>
  );
};
