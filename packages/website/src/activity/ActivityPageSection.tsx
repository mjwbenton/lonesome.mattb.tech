import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import { Wall } from "component/Tile";
import ActivityBarChart from "./ActivityBarChart";
import ActivityAccumulationChart from "./ActivityAccumulationChart";
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
      <div className="space-y-12">
        <Wall>
          <ActivityTile
            type={type}
            period="trailing30"
            km={activity?.trailing30Days[TYPE_TO_GRAPH[type]].km}
            lastYearKm={
              activity?.lastYearTrailing30Days[TYPE_TO_GRAPH[type]].km
            }
          />
          <ActivityTile
            type={type}
            period="year"
            km={activity?.thisYear[TYPE_TO_GRAPH[type]].km}
            lastYearKm={activity?.lastYearToDate[TYPE_TO_GRAPH[type]].km}
          />
        </Wall>
        <ActivityBarChart
          data={{
            thisYear: activity?.thisYear[TYPE_TO_GRAPH[type]].months ?? [],
            lastYear: activity?.lastYear[TYPE_TO_GRAPH[type]].months ?? [],
          }}
        />
        <ActivityAccumulationChart
          data={{
            thisYear: activity?.thisYear[TYPE_TO_GRAPH[type]].days ?? [],
            lastYear: activity?.lastYear[TYPE_TO_GRAPH[type]].days ?? [],
          }}
        />
      </div>
    </EmbeddedWrapper>
  );
}
