import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import { Wall } from "component/Tile";
import { useActivity } from "./activitySummaryDataProvider";
import ActivityTile from "./ActivityTile";

export default function ActivitySummary() {
  const { loading, activity } = useActivity();

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
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
          type="swimming"
          period="trailing30"
          km={activity?.trailing30Days.swimmingDistance.km}
          lastYearKm={activity?.lastYearTrailing30Days.swimmingDistance.km}
        />
        <ActivityTile
          type="walking"
          period="year"
          km={activity?.thisYear.walkingRunningDistance.km}
          lastYearKm={activity?.lastYear.walkingRunningDistance.km}
        />
        <ActivityTile
          type="swimming"
          period="year"
          km={activity?.thisYear.swimmingDistance.km}
          lastYearKm={activity?.lastYear.swimmingDistance.km}
        />
      </Wall>
    </EmbeddedWrapper>
  );
}
