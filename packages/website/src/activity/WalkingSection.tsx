import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import { Wall } from "component/Tile";
import DistanceBarChart from "./DistanceBarChart";
import DistanceAccumulationChart from "./DistanceAccumulationChart";
import { useActivityPage } from "./activityPageDataProvider";
import DistanceTile from "./DistanceTile";
import Expander from "component/Expander";
import { ACTIVITY_TYPE_CONFIG } from "./activityTypes";
import StripedList, { StripeElement } from "component/StripedList";
import React from "react";
import { isBefore } from "date-fns/isBefore";
import { parseISO } from "date-fns/parseISO";
import { subDays } from "date-fns/subDays";
import Icon from "component/Icon";
import { RiAlertLine } from "react-icons/ri";
import { formatKm } from "./format";

export default function WalkingSection() {
  const { activity, loading } = useActivityPage();

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <div className="space-y-12">
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
            icon={ACTIVITY_TYPE_CONFIG.walking.icon}
            verb={ACTIVITY_TYPE_CONFIG.walking.verb}
            period="year"
            km={activity?.thisYear.walkingRunningDistance.km}
            lastYearKm={activity?.lastYearToDate.walkingRunningDistance.km}
          />
        </Wall>
        <DistanceBarChart
          data={{
            thisYear: activity?.thisYear.walkingRunningDistance.months ?? [],
            lastYear: activity?.lastYear.walkingRunningDistance.months ?? [],
          }}
        />
        <DistanceAccumulationChart
          data={{
            thisYear: activity?.thisYear.walkingRunningDistance.days ?? [],
            lastYear: activity?.lastYear.walkingRunningDistance.days ?? [],
          }}
        />
        <Expander text="Recent Data">
          <StripedList>
            {(activity?.thisYear.walkingRunningDistance.days ?? [])
              .slice(-30)
              .reverse()
              .map((day, i, days) => (
                <React.Fragment key={day.date}>
                  {i > 0 &&
                  isBefore(
                    parseISO(day.date),
                    subDays(parseISO(days[i - 1].date), 1)
                  ) ? (
                    <StripeElement>
                      <span>
                        <Icon component={RiAlertLine} /> No data for days
                        between {day.date} and {days[i - 1].date}
                      </span>
                    </StripeElement>
                  ) : null}
                  <StripeElement>
                    <div>
                      <div className="font-bold">{day.date}</div>
                      <div>
                        <Icon component={ACTIVITY_TYPE_CONFIG.walking.icon} />{" "}
                        {formatKm(day.km)}
                      </div>
                    </div>
                  </StripeElement>
                </React.Fragment>
              ))}
          </StripedList>
        </Expander>
      </div>
    </EmbeddedWrapper>
  );
}
