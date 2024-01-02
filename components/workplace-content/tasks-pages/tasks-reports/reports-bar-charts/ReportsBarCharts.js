import React from "react";
import { YearlyChart } from "./YearlyChart";
import { DelayedChart } from "./DelayedChart";

export const ReportsBarCharts = () => {
  return (
    <div>
      {" "}
      <div className="grid-container3 md:mx-10 mx-5 mt-5 mb-5">
        <div className="grid-item3 item10 all-emp-wrapper  ">
          <YearlyChart />
        </div>
        <div className="grid-item3 item11 all-emp-wrapper flex justify-end items-end">
          <DelayedChart />
        </div>
      </div>
    </div>
  );
};
