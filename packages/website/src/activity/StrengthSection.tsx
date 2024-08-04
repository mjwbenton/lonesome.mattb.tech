import EmbeddedWrapper from "component/EmbeddedWrapper";
import { useActivityPage } from "./activityPageDataProvider";
import { TopRightSpinner } from "component/Spinner";
import Tile, { Wall } from "component/Tile";
import Expander from "component/Expander";
import { PiBarbell } from "react-icons/pi";
import Icon from "component/Icon";
import formatPercentageChange from "utils/formatPercentageChange";
import StripedList, { StripeElement } from "component/StripedList";
import { parseISO } from "date-fns/parseISO";

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "short",
  timeStyle: "short",
});

export default function StrengthSection() {
  const { activity, loading } = useActivityPage();

  const trailing30 = {
    count: activity?.trailing30Days.strengthWorkouts?.count ?? 0,
    duration: activity?.trailing30Days.strengthWorkouts?.durationSeconds ?? 0,
    activeEnergyBurned:
      activity?.trailing30Days.strengthWorkouts?.activeEnergyBurned ?? 0,
    workouts: activity?.trailing30Days.strengthWorkouts?.workouts ?? [],
  };

  const previous30 = {
    count: activity?.previous30Days.strengthWorkouts?.count ?? 0,
    duration: activity?.previous30Days.strengthWorkouts?.durationSeconds ?? 0,
    activeEnergyBurned:
      activity?.previous30Days.strengthWorkouts?.activeEnergyBurned ?? 0,
  };

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <div className="space-y-12">
        <Wall>
          <Tile>
            <Icon component={PiBarbell} />
            <strong>{trailing30.count}</strong> strength workouts lasting{" "}
            <strong>{formatDuration(trailing30.duration)}</strong> seconds
            <br />
            <span className="text-xs">
              {formatPercentageChange(trailing30.duration, previous30.duration)}{" "}
              change on the previous 30 days
            </span>
          </Tile>
          <Tile>
            <Icon component={PiBarbell} />
            <strong>{trailing30.activeEnergyBurned}</strong> kcals burned
            <br />
            <span className="text-xs">
              {formatPercentageChange(
                trailing30.activeEnergyBurned,
                previous30.activeEnergyBurned
              )}{" "}
              change on the previous 30 days
            </span>
          </Tile>
        </Wall>
        <Expander text="Recent Workouts">
          <StripedList>
            {trailing30.workouts.map((workout) => (
              <StripeElement key={workout.startTime}>
                <div>
                  <div className="font-bold">
                    {DATE_FORMAT.format(parseISO(workout.startTime))}
                  </div>
                  <div className="italic">
                    {formatDuration(workout.durationSeconds)} -{" "}
                    {workout.activeEnergyBurned} kcals
                  </div>
                </div>
              </StripeElement>
            ))}
          </StripedList>
        </Expander>
      </div>
    </EmbeddedWrapper>
  );
}

function formatDuration(value: number): string {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${minutes}m ${seconds}s`;
}
