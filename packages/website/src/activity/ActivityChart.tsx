import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import theme from "style/theme.preval";

const FONT_FAMILY = Object.values(theme.fontFamily["mono"])
  .map((font) => `'${font}'`)
  .join(", ");
const COLOR_1 = theme.colors["accent-dark"][1];
const COLOR_2 = theme.colors["accent-light"]["DEFAULT"];
const FONT_SMALL = 10;
const FONT_BASE = 12;
const TOOLTIP_BACKGROUND = theme.colors["light"]["1"];

export type ChartData = {
  readonly thisYear: readonly { readonly month: number; readonly km: number }[];
  readonly lastYear: readonly { readonly month: number; readonly km: number }[];
};

export default function ActivityChart({ data }: { data: ChartData }) {
  return (
    <VictoryChart
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          labels={({ datum }) => `${Math.round(datum.km)}km`}
          labelComponent={
            <VictoryTooltip
              cornerRadius={0}
              flyoutStyle={{ stroke: "none", fill: TOOLTIP_BACKGROUND }}
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
            style={{ fontFamily: FONT_FAMILY, fontSize: FONT_BASE }}
            dy={-20}
          />
        }
        style={{ tickLabels: { fontFamily: FONT_FAMILY, fontSize: FONT_BASE } }}
      />
      <VictoryAxis
        tickCount={12}
        tickFormat={(x) => monthNumberToName(x)}
        style={{
          tickLabels: { fontFamily: FONT_FAMILY, fontSize: FONT_SMALL },
        }}
      />
      <VictoryGroup offset={-5}>
        <VictoryBar
          style={{
            data: { fill: COLOR_1, width: 10 },
            labels: {
              fill: COLOR_1,
              fontFamily: FONT_FAMILY,
              fontSize: FONT_SMALL,
            },
          }}
          data={data.lastYear}
          x="month"
          y="km"
        />
        <VictoryBar
          style={{
            data: {
              fill: COLOR_2,
              width: 10,
              strokeWidth: 0.5,
              stroke: "black",
            },
            labels: {
              fill: COLOR_2,
              fontFamily: FONT_FAMILY,
              fontSize: FONT_SMALL,
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
