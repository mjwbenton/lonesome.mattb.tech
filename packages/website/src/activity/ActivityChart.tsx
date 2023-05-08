import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import themeValues from "style/theme.preval";
import { useTheme } from "next-themes";

export type ChartData = {
  readonly thisYear: readonly { readonly month: number; readonly km: number }[];
  readonly lastYear: readonly { readonly month: number; readonly km: number }[];
};

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

export default function ActivityChart({ data }: { data: ChartData }) {
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
      padding={{ left: 60, bottom: 40, right: 20, top: 40 }}
    >
      <VictoryAxis
        dependentAxis
        label="Km"
        axisLabelComponent={
          <VictoryLabel
            style={{
              fontFamily: fontFamily,
              fontSize: fontBase,
              fill: baseColor,
            }}
            dy={-20}
          />
        }
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

function monthNumberToName(month: number) {
  const date = new Date();
  date.setMonth(month - 1);
  return date.toLocaleString("default", { month: "short" });
}
