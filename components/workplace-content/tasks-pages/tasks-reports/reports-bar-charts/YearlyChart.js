import React from "react";

import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory";

export const YearlyChart = () => {
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
    { month: "Nov", value: 250 },
    { month: "Dec", value: 270 },
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
    <div>
      <div className="p-2 ">
        {" "}
        <div className="chart-title">Tasks Completed</div>
        <div className="chart-title">500</div>
        <VictoryChart>
          <VictoryAxis
            tickValues={data.map((item) => item.month)}
            tickFormat={data.map((item) => item.month)}
            style={{
              tickLabels: { fill: "#979797" }, // Change the color of the axis labels
              axis: { stroke: "none" }, // Change the color
            }}
            tickLabelComponent={
              <VictoryLabel
                style={{ fontSize: 10, fill: "#979797" }} // Adjust the font size and color
              />
            }
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(t) => `${t}`}
            style={{
              tickLabels: { fill: "#979797" }, // Change the color of the axis labels
              axis: { stroke: "none" }, // Change the color
            }}
            tickLabelComponent={
              <VictoryLabel
                style={{ fontSize: 10, fill: "#979797" }} // Adjust the font size and color
              />
            }
          />

          <VictoryBar
            barWidth={15} // Adjust the bar width to increase the gap between bars
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            cornerRadius={{ top: 8 }}
            data={data}
            x="month"
            y="value"
            style={{
              data: {
                fill: "#b695f8", // Set bar color to #b695f8

                roundedBar: 8, // Set the rounded bar property to 8 (0.8rem)
              },
              labels: {
                fill: "#979797", // Set the color of the text labels on the bars to #979797
              },
            }}
          />
        </VictoryChart>
      </div>
    </div>
  );
};
