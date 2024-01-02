import React from "react";
import { TaskAssignedIcon } from "utills/svgs/TaskAssignedIcon";
import { TaskTick } from "utills/svgs/TaskTick";
import { TasksClock } from "utills/svgs/TasksClock";

export const TaskNumbersCard = ({ empInfo }) => {
  return (
    <div className="p-3">
      <div className="profile-number-card p-2 flex gap-3 items-center">
        <div>
          <TaskAssignedIcon />
        </div>
        <div>
          {" "}
          <div className="flex  gap-1 flex-col">
            <div className="profile-number-card-title"> Assigned Tasks</div>
            <div className="profile-number-card-number">
              {empInfo && empInfo[0]?.task_assign}
            </div>
          </div>
        </div>
      </div>
      <div className="profile-number-card-two p-2 mt-2 flex gap-3 items-center">
        <div>
          <TaskTick />
        </div>
        <div>
          {" "}
          <div className="flex  gap-1 flex-col">
            <div className="profile-number-card-title"> Completed Tasks</div>
            <div className="profile-number-card-number">
              {empInfo && empInfo[0]?.task_completed}
            </div>
          </div>
        </div>
      </div>

      <div className="profile-number-card-three p-2 mt-2 flex gap-3 items-center">
        <div>
          <TasksClock />
        </div>
        <div>
          {" "}
          <div className="flex  gap-1 flex-col">
            <div className="profile-number-card-title">Delayed Tasks</div>
            <div className="profile-number-card-number">
              {empInfo && empInfo[0]?.task_overdue}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
