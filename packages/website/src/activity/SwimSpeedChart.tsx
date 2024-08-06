import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import useChartTheme from "./useChartTheme";
import { useEffect, useState } from "react";

export type BarChartData = readonly {
  readonly month: number;
  readonly mps: number;
}[];

export default function SwimSpeedChart({ data }: { data: BarChartData }) {
  const {
    fontFamily,
    colorThisYear,
    fontSmall,
    fontBase,
    tooltipBackground,
    baseColor,
  } = useChartTheme();

  // Only mount on the server as the chart is dependent on the theme which cannot be known on the server
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <VictoryChart
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          labels={({ datum }) => `${datum.mps} mps`}
          labelComponent={
            <VictoryTooltip
              cornerRadius={0}
              flyoutStyle={{ stroke: "none", fill: tooltipBackground }}
              pointerWidth={0}
            />
          }
          mouseFollowTooltips
        />
      }
      domainPadding={10}
      padding={{ left: 60, bottom: 60, right: 20, top: 30 }}
    >
      <VictoryLabel
        text="Speed by month"
        x={230}
        y={10}
        textAnchor="middle"
        style={{ fill: baseColor, fontSize: fontBase, fontFamily }}
      />
      <VictoryAxis
        dependentAxis
        style={{
          tickLabels: {
            fontFamily: fontFamily,
            fontSize: fontBase,
            fill: baseColor,
          },
          ticks: { stroke: baseColor, size: 5 },
          axis: { stroke: baseColor },
        }}
      />
      <VictoryAxis
        tickCount={data.length}
        style={{
          tickLabels: {
            fontFamily: fontFamily,
            fontSize: fontSmall,
            fill: baseColor,
            angle: -45,
            verticalAnchor: "middle",
            textAnchor: "end",
          },
          axis: { stroke: baseColor },
        }}
      />
      <VictoryGroup offset={-5}>
        <VictoryLine
          style={{
            data: {
              stroke: colorThisYear,
              strokeWidth: 2,
            },
            labels: {
              fill: colorThisYear,
              fontFamily: fontFamily,
              fontSize: fontSmall,
            },
          }}
          data={data}
          x={(d) => formatMonthYear(d)}
          y="mps"
        />
      </VictoryGroup>
    </VictoryChart>
  );
}

function formatMonthYear({ month, year }: { month: number; year: number }) {
  return `${year}-${month.toString().padStart(2, "0")}`;
}
