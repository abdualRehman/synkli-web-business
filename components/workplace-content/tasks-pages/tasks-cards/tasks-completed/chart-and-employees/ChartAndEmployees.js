import React from "react";
import { TaskEmployees } from "./TaskEmployees";
import { TasksChart } from "./TasksChart";
import { WeeklyChart } from "./WeeklyChart";

export const ChartAndEmployees = () => {
  return (
    <div className="grid md:grid-cols-8 gap-3">
      <div className="col-span-3 ">
        <TasksChart />
      </div>
      <div className="col-span-3 "><WeeklyChart /></div>
      <div className="col-span-2 ">
        <div className="employees-list-cards">
          {" "}
          <TaskEmployees />
        </div>
      </div>
    </div>
  );
};
