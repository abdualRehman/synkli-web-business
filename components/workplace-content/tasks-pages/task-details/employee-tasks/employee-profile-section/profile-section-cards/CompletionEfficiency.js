import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const CompletionEfficiency = ({ efficiency }) => {
  console.log(efficiency, "efi");
  const roundedCorners = (radius, strokeWidth) => {
    return {
      strokeLinecap: "butt",
      path: { strokeLinecap: "butt", stroke: "#b695f8" },
      trail: { strokeLinecap: "butt" },
    };
  };
  return (
    <div className="p-5 flex justify-center items-center ">
      <div>
        {" "}
        <div className="chart-title text-center">
          Task Completion Efficiency
        </div>
        <div className="mt-5">
          {" "}
          <div style={{ width: "25vmin", height: "25vmin" }}>
            <CircularProgressbar
              value={parseInt(efficiency)}
              text={`${parseInt(efficiency)}%`}
              strokeWidth={15}
              styles={buildStyles({
                textSize: "16px",
                textColor: "#000",
                pathColor: "#b695f8",
                trailColor: "#d6d6d6",
              })}
              path={roundedCorners(50, 12)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
