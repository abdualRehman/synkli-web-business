import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";

export const TaskTypesCard = () => {
  return (
    <div>
      {" "}
      <div className="p-5">
        {" "}
        <div className="chart-title">Completed Task Types</div>
        <div className="completed-task-type-strip mt-3">
          <div className="flex justify-between items-center">
            <div>Organizational</div>
            <div>10/10</div>
          </div>
          <div className="mt-2">
            {" "}
            <ProgressBar
              completed={50}
              bgColor="#b695f8"
              height="5px"
              width="100%"
              animateOnRender={true}
              isLabelVisible={false}
            />
          </div>
        </div>
        <div className="completed-task-type-strip mt-3">
          <div className="flex justify-between items-center">
            <div>Adminstration</div>
            <div>10/10</div>
          </div>
          <div className="mt-2">
            {" "}
            <ProgressBar
              completed={50}
              bgColor="#F8F0E7"
              height="5px"
              width="100%"
              animateOnRender={true}
              isLabelVisible={false}
            />
          </div>
        </div>
        <div className="completed-task-type-strip mt-3">
          <div className="flex justify-between items-center">
            <div>Important</div>
            <div>10/10</div>
          </div>
          <div className="mt-2">
            {" "}
            <ProgressBar
              completed={50}
              bgColor="#2AD4AF"
              height="5px"
              width="100%"
              animateOnRender={true}
              isLabelVisible={false}
            />
          </div>
        </div>
        <div className="completed-task-type-strip mt-3">
          <div className="flex justify-between items-center">
            <div>Calculated</div>
            <div>10/10</div>
          </div>
          <div className="mt-2">
            {" "}
            <ProgressBar
              completed={50}
              bgColor="#DC7B7B"
              height="5px"
              width="100%"
              animateOnRender={true}
              isLabelVisible={false}
            />
          </div>
        </div>
        <div className="completed-task-type-strip mt-3">
          <div className="flex justify-between items-center">
            <div>Calculated</div>
            <div>10/10</div>
          </div>
          <div className="mt-2">
            {" "}
            <ProgressBar
              completed={50}
              bgColor="#DC7B7B"
              height="5px"
              width="100%"
              animateOnRender={true}
              isLabelVisible={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
