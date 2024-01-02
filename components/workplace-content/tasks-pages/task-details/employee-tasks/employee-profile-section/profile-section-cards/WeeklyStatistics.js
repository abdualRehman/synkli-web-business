import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryGroup,
} from "victory";

export const WeeklyStatistics = ({ weeklyStats }) => {
  console.log(weeklyStats, "weekly");
  return (
    <div className="p-5">
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
      <div>
        <VictoryChart
          theme={VictoryTheme.material}
          domain={{ y: [0, 6] }}
          height={270}
          width={400}
          padding={{ top: 20, bottom: 50, left: 40, right: 20 }}
        >
          <VictoryAxis
            dependentAxis
            style={{
              tickLabels: { fill: "#979797" }, // Change the color of the axis labels
              axis: { stroke: "none" }, // Change the color
            }}
          />
          <VictoryAxis
            tickFormat={["Mon", "Tue", "Wed", "Thu", "Fri", "SAT", "SUN"]}
            style={{
              tickLabels: { fill: "#979797" }, // Change the color of the axis labels
              axis: { stroke: "none" }, // Change the color
            }}
          />
          <VictoryGroup
            horizontal
            offset={14}
            style={{ data: { width: 6 } }}
            colorScale={["brown", "tomato", "gold"]}
          >
            <VictoryBar
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              cornerRadius={{ top: 5 }}
              barWidth={10}
              style={{ data: { fill: "#0D1B37" } }}
              data={weeklyStats?.currentWeekStats}
            />
            <VictoryBar
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              cornerRadius={{ top: 5 }}
              barWidth={10}
              style={{ data: { fill: "#b695f8" } }}
              data={weeklyStats?.lastWeekStats}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
    </div>
  );
};
