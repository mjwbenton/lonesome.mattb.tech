import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import { Wall } from "component/Tile";
import ActivityBarChart from "./ActivityBarChart";
import ActivityAccumulationChart from "./ActivityAccumulationChart";
import { useActivityPage } from "./activityPageDataProvider";
import ActivityTile from "./ActivityTile";
import Expander from "component/Expander";
import ActivityRecentData from "./ActivityRecentData";
import { ACTIVITY_TYPE_CONFIG } from "./activityTypes";
import Icon from "component/Icon";
import { formatDuration, formatKm, formatStartTime } from "./format";
import StripedList, { StripeElement } from "component/StripedList";

export default function SwimmingSection() {
  const { activity, loading } = useActivityPage();

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <div className="space-y-12">
        <Wall>
          <ActivityTile
            icon={ACTIVITY_TYPE_CONFIG.swimming.icon}
            verb={ACTIVITY_TYPE_CONFIG.swimming.verb}
            period="trailing30"
            km={activity?.trailing30Days.swimmingDistance.km}
            lastYearKm={activity?.lastYearTrailing30Days.swimmingDistance.km}
          />
          <ActivityTile
            icon={ACTIVITY_TYPE_CONFIG.swimming.icon}
            verb={ACTIVITY_TYPE_CONFIG.swimming.verb}
            period="year"
            km={activity?.thisYear.swimmingDistance.km}
            lastYearKm={activity?.lastYearToDate.swimmingDistance.km}
          />
        </Wall>
        <ActivityBarChart
          data={{
            thisYear: activity?.thisYear.swimmingDistance.months ?? [],
            lastYear: activity?.lastYear.swimmingDistance.months ?? [],
          }}
        />
        <ActivityAccumulationChart
          data={{
            thisYear: activity?.thisYear.swimmingDistance.days ?? [],
            lastYear: activity?.lastYear.swimmingDistance.days ?? [],
          }}
        />
        <Expander text="Recent Data">
          <StripedList>
            {activity?.trailing30Days.swimWorkouts?.workouts.map((workout) => (
              <StripeElement key={workout.startTime}>
                <div>
                  <div className="font-bold">
                    {formatStartTime(workout.startTime)}
                  </div>
                  <div>
                    <Icon component={ACTIVITY_TYPE_CONFIG.swimming.icon} />{" "}
                    {formatDuration(workout.speed!.spm * 100)} per 100m{" "}
                    <span className="text-xs">
                      ({formatKm(workout.distance!.km)} in{" "}
                      {formatDuration(workout.durationSeconds)})
                    </span>
                  </div>
                </div>
              </StripeElement>
            )) ?? []}
          </StripedList>
        </Expander>
      </div>
    </EmbeddedWrapper>
  );
}
