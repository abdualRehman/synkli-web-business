import React from "react";
import "./css/lineChartAndInfo.css";
import { WeeklyStatistics } from "./WeeklyStatistics";
import { TaskTypesCard } from "./TaskTypesCard";
import { TopEmployees } from "./TopEmployees";
export const LineChartAndInfo = () => {
  return (
    <div className="md:mx-10 mx-5">
      <div className="grid md:grid-cols-3 gap-5">
        <div className="all-emp-wrapper flex justify-content-end">
          <WeeklyStatistics />
        </div>
        <div className="all-emp-wrapper">
          <TaskTypesCard />
        </div>
        <div className="all-emp-wrapper">
          <TopEmployees />
        </div>
      </div>
    </div>
  );
};
