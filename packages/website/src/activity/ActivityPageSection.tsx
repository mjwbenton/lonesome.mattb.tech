import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import { Wall } from "component/Tile";
import ActivityChart from "./ActivityChart";
import { useActivityPage } from "./activityPageDataProvider";
import ActivityTile from "./ActivityTile";

type ActivityType = "walking" | "swimming";

const TYPE_TO_GRAPH = {
  walking: "walkingRunningDistance",
  swimming: "swimmingDistance",
} as const;

export default function ActivityPageSection({ type }: { type: ActivityType }) {
  const { activity, loading } = useActivityPage();
  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <Wall>
        <ActivityTile
          type={type}
          period="trailing30"
          km={activity?.trailing30Days[TYPE_TO_GRAPH[type]].km}
          lastYearKm={activity?.lastYearTrailing30Days[TYPE_TO_GRAPH[type]].km}
        />
        <ActivityTile
          type="walking"
          period="year"
          km={activity?.thisYear[TYPE_TO_GRAPH[type]].km}
          lastYearKm={activity?.lastYearToDate[TYPE_TO_GRAPH[type]].km}
        />
      </Wall>
      <ActivityChart
        data={{
          thisYear: activity?.thisYear[TYPE_TO_GRAPH[type]].months ?? [],
          lastYear: activity?.lastYear[TYPE_TO_GRAPH[type]].months ?? [],
        }}
      />
    </EmbeddedWrapper>
  );
}
