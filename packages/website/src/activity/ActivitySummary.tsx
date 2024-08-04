import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import { Wall } from "component/Tile";
import { useActivity } from "./activitySummaryDataProvider";
import DistanceTile from "./DistanceTile";
import { ACTIVITY_TYPE_CONFIG } from "./activityTypes";

export default function ActivitySummary() {
  const { loading, activity } = useActivity();

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <Wall>
        <DistanceTile
          icon={ACTIVITY_TYPE_CONFIG.walking.icon}
          verb={ACTIVITY_TYPE_CONFIG.walking.verb}
          period="trailing30"
          km={activity?.trailing30Days.walkingRunningDistance.km}
          lastYearKm={
            activity?.lastYearTrailing30Days.walkingRunningDistance.km
          }
        />
        <DistanceTile
          icon={ACTIVITY_TYPE_CONFIG.swimming.icon}
          verb={ACTIVITY_TYPE_CONFIG.swimming.verb}
          period="trailing30"
          km={activity?.trailing30Days.swimmingDistance.km}
          lastYearKm={activity?.lastYearTrailing30Days.swimmingDistance.km}
        />
        <DistanceTile
          icon={ACTIVITY_TYPE_CONFIG.walking.icon}
          verb={ACTIVITY_TYPE_CONFIG.walking.verb}
          period="year"
          km={activity?.thisYear.walkingRunningDistance.km}
          lastYearKm={activity?.lastYear.walkingRunningDistance.km}
        />
        <DistanceTile
          icon={ACTIVITY_TYPE_CONFIG.swimming.icon}
          verb={ACTIVITY_TYPE_CONFIG.swimming.verb}
          period="year"
          km={activity?.thisYear.swimmingDistance.km}
          lastYearKm={activity?.lastYear.swimmingDistance.km}
        />
      </Wall>
    </EmbeddedWrapper>
  );
}
