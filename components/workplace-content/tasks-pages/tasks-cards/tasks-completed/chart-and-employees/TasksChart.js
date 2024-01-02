import React from "react";
import { useSelector } from "react-redux";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTheme,
} from "victory";

export const TasksChart = () => {
  const { data: yearlyStats } = useSelector((state) => state.yearlyStatistics);
  const data = [
    { month: "Jan", value: 100 },
    { month: "Feb", value: 150 },
    { month: "Mar", value: 200 },
    { month: "Apr", value: 120 },
    { month: "May", value: 250 },
    { month: "Jun", value: 180 },
    { month: "Jul", value: 300 },
    { month: "Aug", value: 220 },
    { month: "Sep", value: 280 },
    { month: "Oct", value: 200 },
    { month: "Nov", value: 350 },
    { month: "Dec", value: 270 },
  ];

  const stats = [
    {
      month: "Jan",
      value: 0,
    },
    {
      month: "Feb",
      value: 0,
    },
    {
      month: "Mar",
      value: 0,
    },
    {
      month: "Apr",
      value: 0,
    },
    {
      month: "May",
      value: 0,
    },
    {
      month: "Jun",
      value: 0,
    },
    {
      month: "Jul",
      value: 0,
    },
    {
      month: "Aug",
      value: 0,
    },
    {
      month: "Sep",
      value: 0,
    },
    {
      month: "Oct",
      value: 0,
    },
    {
      month: "Nov",
      value: 0,
    },
    {
      month: "Dec",
      value: 0,
    },
  ];
  const backgroundLines = data.map((item) => {
    return { x: item.month, y: 0 }; // Lines at y=0 behind the bars
  });
  const customTheme = {
    axis: {
      y: {
        axis: { stroke: "blue" }, // Change the color of the Y-axis line
      },
    },
  };
  return (
    <div className="p-2  all-emp-wrapper ">
      {" "}
      <div className="chart-title">Tasks Completed</div>
      <div className="chart-title mb-2">500</div>
      <VictoryChart
        theme={VictoryTheme.grayscale}
        domainPadding={20}
        padding={{ top: 40, bottom: 40, left: 40, right: 5 }}
      >
        <VictoryAxis
          tickValues={data.map((item) => item.month)}
          tickFormat={data.map((item) => item.month)}
          style={{
            tickLabels: { fill: "#979797" }, // Change the color of the axis labels
            axis: { stroke: "none" }, // Change the color
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(t) => `${t}`}
          style={{
            tickLabels: { fill: "#979797" }, // Change the color of the axis labels
            axis: { stroke: "none" }, // Change the color
          }}
        />

        <VictoryBar
          barWidth={20} // Adjust the bar width to increase the gap between bars
          padding={40} // Adjust the padding to control the gap between bars
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          cornerRadius={{ top: 10 }}
          data={yearlyStats?.length ? yearlyStats : stats}
          x="month"
          y="value"
          style={{
            data: {
              fill: "#b695f8", // Set bar color to #b695f8
              width: 20, // Customize bar width
              roundedBar: 8, // Set the rounded bar property to 8 (0.8rem)
            },
            labels: {
              fill: "#979797", // Set the color of the text labels on the bars to #979797
            },
          }}
        />
      </VictoryChart>
    </div>
  );
};
