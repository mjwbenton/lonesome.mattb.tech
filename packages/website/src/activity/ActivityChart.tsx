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
import themeValues from "style/theme.preval";
import { useTheme } from "next-themes";
import getDayOfYear from "date-fns/getDayOfYear";
import parseISO from "date-fns/parseISO";

function useChartTheme() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  console.log("isDark", isDark);

  const fontFamily = Object.values(themeValues.fontFamily["mono"])
    .map((font) => `'${font}'`)
    .join(", ");
  const colorLastYear = themeValues.colors["accent-dark"][1];
  const colorThisYear = themeValues.colors["accent-light"]["DEFAULT"];
  const fontSmall = 10;
  const fontBase = 12;
  const tooltipBackground = isDark
    ? themeValues.colors["dark"]["1"]
    : themeValues.colors["light"]["1"];
  const baseColor = isDark
    ? themeValues.colors["light"]["1"]
    : themeValues.colors["dark"]["1"];

  return {
    fontFamily,
    colorLastYear,
    colorThisYear,
    fontSmall,
    fontBase,
    tooltipBackground,
    baseColor,
  };
}

export type BarChartData = {
  readonly thisYear: readonly { readonly month: number; readonly km: number }[];
  readonly lastYear: readonly { readonly month: number; readonly km: number }[];
};

export function ActivityBarChart({ data }: { data: BarChartData }) {
  const {
    fontFamily,
    colorLastYear,
    colorThisYear,
    fontSmall,
    fontBase,
    tooltipBackground,
    baseColor,
  } = useChartTheme();

  return (
    <VictoryChart
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
      domainPadding={10}
      padding={{ left: 60, bottom: 30, right: 20, top: 30 }}
    >
      <VictoryLabel
        text="Kilometers by month"
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
        tickCount={12}
        tickFormat={(x) => monthNumberToName(x)}
        style={{
          tickLabels: {
            fontFamily: fontFamily,
            fontSize: fontSmall,
            fill: baseColor,
          },
          axis: { stroke: baseColor },
        }}
      />
      <VictoryGroup offset={-5}>
        <VictoryBar
          style={{
            data: { fill: colorLastYear, width: 10 },
            labels: {
              fill: colorLastYear,
              fontFamily: fontFamily,
              fontSize: fontSmall,
            },
          }}
          data={data.lastYear}
          x="month"
          y="km"
        />
        <VictoryBar
          style={{
            data: {
              fill: colorThisYear,
              width: 10,
              strokeWidth: 0.5,
              stroke: baseColor,
            },
            labels: {
              fill: colorThisYear,
              fontFamily: fontFamily,
              fontSize: fontSmall,
            },
          }}
          data={data.thisYear}
          x="month"
          y="km"
        />
      </VictoryGroup>
    </VictoryChart>
  );
}

export type AccumulationChartData = {
  readonly thisYear: readonly { readonly date: string; readonly km: number }[];
  readonly lastYear: readonly { readonly date: string; readonly km: number }[];
};

export function ActivityAccumulationChart({
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

  const thisYear = data.thisYear.reduce<{ dayOfYear: number; km: number }[]>(
    (acc, cur) => {
      const km = acc.length > 0 ? acc[acc.length - 1].km + cur.km : cur.km;
      acc.push({ dayOfYear: getDayOfYear(parseISO(cur.date)), km });
      return acc;
    },
    []
  );

  const lastYear = data.lastYear.reduce<{ dayOfYear: number; km: number }[]>(
    (acc, cur) => {
      const km = acc.length > 0 ? acc[acc.length - 1].km + cur.km : cur.km;
      acc.push({ dayOfYear: getDayOfYear(parseISO(cur.date)), km });
      return acc;
    },
    []
  );

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

function middleOfEachMonth() {
  const year = new Date().getFullYear();
  return Array.from({ length: 12 }, (_, i) => {
    return getDayOfYear(new Date(year, i, 15));
  });
}

function monthNumberToName(month: number) {
  const date = new Date();
  date.setMonth(month - 1);
  return date.toLocaleString("default", { month: "short" });
}

function dayOfYearToMonth(dayOfYear: number) {
  const date = new Date();
  date.setMonth(0);
  date.setDate(dayOfYear);
  return date.toLocaleString("default", { month: "short" });
}
