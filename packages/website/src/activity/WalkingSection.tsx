import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import { Wall } from "component/Tile";
import ActivityBarChart from "./ActivityBarChart";
import ActivityAccumulationChart from "./ActivityAccumulationChart";
import { useActivityPage } from "./activityPageDataProvider";
import ActivityTile from "./ActivityTile";
import Expander from "component/Expander";
import ActivityRecentData from "./ActivityRecentData";

export default function WalkingSection() {
  const { activity, loading } = useActivityPage();

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <div className="space-y-12">
        <Wall>
          <ActivityTile
            type="walking"
            period="trailing30"
            km={activity?.trailing30Days.walkingRunningDistance.km}
            lastYearKm={
              activity?.lastYearTrailing30Days.walkingRunningDistance.km
            }
          />
          <ActivityTile
            type="walking"
            period="year"
            km={activity?.thisYear.walkingRunningDistance.km}
            lastYearKm={activity?.lastYearToDate.walkingRunningDistance.km}
          />
        </Wall>
        <ActivityBarChart
          data={{
            thisYear: activity?.thisYear.walkingRunningDistance.months ?? [],
            lastYear: activity?.lastYear.walkingRunningDistance.months ?? [],
          }}
        />
        <ActivityAccumulationChart
          data={{
            thisYear: activity?.thisYear.walkingRunningDistance.days ?? [],
            lastYear: activity?.lastYear.walkingRunningDistance.days ?? [],
          }}
        />
        <Expander text="Recent Data">
          <ActivityRecentData
            type="walking"
            data={activity?.thisYear.walkingRunningDistance.days ?? []}
          />
        </Expander>
      </div>
    </EmbeddedWrapper>
  );
}
