import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryGroup,
} from "victory";

export const DelayedChart = () => {
  return (
    <div className="p-5 ">
      {" "}
      <div className="chart-title">Delayed Tasks</div>
      <div className="mt-5">
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
            tickFormat={["Mon", "Tue", "Wed", "Thu", "Fri"]}
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
              style={{ data: { fill: "#b695f8" } }}
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 4 },
                { x: 4, y: 5 },
                { x: 5, y: 5 },
              ]}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
    </div>
  );
};
