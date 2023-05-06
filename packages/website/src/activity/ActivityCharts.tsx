import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import {
  ActivityChartData,
  useActivityCharts,
} from "./activityChartDataProvider";
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

type ChartData = ActivityChartData["walking"];

export default function ActivityCharts() {
  const { loading, activity } = useActivityCharts();

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      {activity && <Chart label="Km Walked" data={activity.walking} />}
      {activity && <Chart label="Km Swam" data={activity.swimming} />}
    </EmbeddedWrapper>
  );
}

const fontFamily = Object.values(theme.fontFamily["mono"])
  .map((font) => `'${font}'`)
  .join(", ");
const color1 = theme.colors["accent-dark"][1];
const color2 = theme.colors["accent-light"]["DEFAULT"];
const fontSmall = 10;
const fontBase = 12;
const tooltipBackground = theme.colors["light"]["1"];

function Chart({ data, label }: { data: ChartData; label: string }) {
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
        label={label}
        axisLabelComponent={
          <VictoryLabel style={{ fontFamily, fontSize: fontBase }} dy={-20} />
        }
        style={{ tickLabels: { fontFamily, fontSize: fontBase } }}
      />
      <VictoryAxis
        tickCount={12}
        tickFormat={(x) => monthNumberToName(x)}
        style={{ tickLabels: { fontFamily, fontSize: fontSmall } }}
      />
      <VictoryGroup offset={-5}>
        <VictoryBar
          style={{
            data: { fill: color1, width: 10 },
            labels: { fill: color1, fontFamily, fontSize: fontSmall },
          }}
          data={data.lastYear}
          x="month"
          y="km"
        />
        <VictoryBar
          style={{
            data: {
              fill: color2,
              width: 10,
              strokeWidth: 0.5,
              stroke: "black",
            },
            labels: { fill: color2, fontFamily, fontSize: fontSmall },
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
