import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import { getDayOfYear } from "date-fns/getDayOfYear";
import { parseISO } from "date-fns/parseISO";
import useChartTheme from "./useChartTheme";
import { useEffect, useState } from "react";

export type AccumulationChartData = {
  readonly thisYear: readonly { readonly date: string; readonly km: number }[];
  readonly lastYear: readonly { readonly date: string; readonly km: number }[];
};

export default function ActivityAccumulationChart({
  data,
}: {
  data: AccumulationChartData;
}) {
  const {
    fontFamily,
    colorLastYear,
    colorThisYear,
    fontSmall,
    fontBase,
    baseColor,
    tooltipBackground,
  } = useChartTheme();

  // Only mount on the server as the chart is dependent on the theme which cannot be known on the server
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  const thisYear = accumulateDays(data.thisYear);
  const lastYear = accumulateDays(data.lastYear);

  return (
    <VictoryChart
      padding={{ left: 60, bottom: 30, right: 20, top: 30 }}
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          labels={({ datum }) => `${Math.round(datum.km)}km`}
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
    >
      <VictoryLabel
        text="Accumulated kilometers"
        x={230}
        y={10}
        textAnchor="middle"
        style={{ fill: baseColor, fontSize: fontBase, fontFamily }}
      />
      <VictoryAxis
        dependentAxis
        style={{
          tickLabels: {
            fontFamily,
            fontSize: fontBase,
            fill: baseColor,
          },
          ticks: { stroke: baseColor, size: 5 },
          axis: { stroke: baseColor },
        }}
      />
      <VictoryAxis
        tickFormat={(x) => dayOfYearToMonth(x)}
        tickValues={middleOfEachMonth()}
        style={{
          tickLabels: {
            fontFamily: fontFamily,
            fontSize: fontSmall,
            fill: baseColor,
          },
          axis: { stroke: baseColor },
        }}
      />
      <VictoryGroup>
        <VictoryLine
          style={{
            data: { stroke: colorLastYear, strokeWidth: 1 },
            labels: {
              fill: colorLastYear,
              fontFamily: fontFamily,
              fontSize: fontSmall,
            },
          }}
          data={lastYear}
          x="dayOfYear"
          y="km"
        />
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
          data={thisYear}
          x="dayOfYear"
          y="km"
        />
      </VictoryGroup>
    </VictoryChart>
  );
}

function accumulateDays(
  data: readonly { readonly date: string; readonly km: number }[],
) {
  return data.reduce<{ dayOfYear: number; km: number }[]>((acc, cur) => {
    const km = acc.length > 0 ? acc[acc.length - 1].km + cur.km : cur.km;
    acc.push({ dayOfYear: getDayOfYear(parseISO(cur.date)), km });
    return acc;
  }, []);
}

function middleOfEachMonth() {
  const year = new Date().getFullYear();
  return Array.from({ length: 12 }, (_, i) => {
    return getDayOfYear(new Date(year, i, 15));
  });
}

function dayOfYearToMonth(dayOfYear: number) {
  const date = new Date();
  date.setMonth(0);
  date.setDate(dayOfYear);
  return date.toLocaleString("default", { month: "short" });
}
