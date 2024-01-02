import React from "react";
import "./css/tasksReports.css";
import { TasksReoprtsJumbo } from "./TasksReoprtsJumbo";
import { TasksReportsOperations } from "./TasksReportsOperations";
import { NumberCards } from "./number-cards/NumberCards";
import { ReportsBarCharts } from "./reports-bar-charts/ReportsBarCharts";
import { LineChartAndInfo } from "./linechart-and-info/LineChartAndInfo";
export const TasksReportsPage = () => {
  return (
    <div>
      <TasksReoprtsJumbo />
      <TasksReportsOperations />
      <NumberCards />
      <ReportsBarCharts />
      <LineChartAndInfo />
    </div>
  );
};
