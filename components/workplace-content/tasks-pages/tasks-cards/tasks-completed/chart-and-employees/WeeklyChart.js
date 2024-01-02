import React from "react";
import { useSelector } from "react-redux";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryLabel,
  VictoryVoronoiContainer,
  VictoryTheme,
} from "victory";

export const WeeklyChart = () => {
  const { data: weeklyStats } = useSelector(
    (state) => state.weeklyStatsCompleted
  );

  // Define day names for the x-axis
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className=" p-2  all-emp-wrapper">
      {" "}
      <div className="chart-title">Weekly Statistics</div>
      <div className="flex items-center gap-10 mt-3">
        <div className="flex items-center gap-2">
          <div className="this-week"></div>
          <div className="week-label">This Week</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="pre-week"></div>
          <div className="week-label">Previous Week</div>
        </div>
      </div>
       {weeklyStats ?     <VictoryChart
        theme={VictoryTheme.grayscale}
        padding={{ top: 40, bottom: 82, left: 40, right: 40 }}
      >
        <VictoryAxis
          tickValues={dayNames.map((day, index) => index + 1)} // Assign numeric values to days
          tickFormat={dayNames} // Use day names as labels
          style={{
            tickLabels: { fontSize: 12, fill: "#979797" }, // Customize the font size and other styles
            axis: { stroke: "none" }, // Change the color
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fill: "#979797" }, // Change the color of the axis labels
            axis: { stroke: "none" }, // Change the color
          }}
          // Customize dependent axis (y-axis) labels, ticks, and style as needed
        />
        <VictoryLine
          animate={{
            duration: 1500,
            onLoad: { duration: 500 },
          }}
          data={weeklyStats?.currentWeekStats}
          style={{
            data: { stroke: "#0D1B37" }, // Line color for dataLine1
            parent: { border: "1px solid #ccc" },
          }}
        />
        <VictoryLine
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          data={weeklyStats?.lastWeekStats}
          style={{
            data: { stroke: "#b695f8" }, // Line color for dataLine2
          }}
        />

        <VictoryScatter
          data={[
            ...weeklyStats?.currentWeekStats,
            ...weeklyStats?.lastWeekStats,
          ]} // Combine data points for both lines
          style={{
            data: { fill: "black" }, // Peak point color
          }}
          size={5} // Customize the size of the peak points
          labelComponent={
            <VictoryLabel // Add a margin to the labels
              dy={10} // Adjust the dy value to control the margin
              style={{ fill: "black", margin: "10px" }}
            />
          }
        />
      </VictoryChart> : ""}
    </div>
  );
};
