import Icon from "component/Icon";
import StripedList, { StripeElement } from "component/StripedList";
import { isBefore } from "date-fns/isBefore";
import { parseISO } from "date-fns/parseISO";
import { subDays } from "date-fns/subDays";
import { RiAlertLine } from "react-icons/ri";
import { formatKm } from "./ActivityTile";
import { ActivityType, ACTIVITY_TYPE_CONFIG } from "./activityTypes";
import React from "react";

export default function ActivityRecentData({
  type,
  data,
}: {
  type: ActivityType;
  data: readonly { readonly date: string; readonly km: number }[];
}) {
  return (
    <StripedList>
      {data
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
                  <Icon component={RiAlertLine} /> No data for days between{" "}
                  {day.date} and {days[i - 1].date}
                </span>
              </StripeElement>
            ) : null}
            <StripeElement>
              <div>
                <div className="font-bold">{day.date}</div>
                <div className="italic">
                  <Icon component={ACTIVITY_TYPE_CONFIG[type].icon} />{" "}
                  {formatKm(day.km)}
                </div>
              </div>
            </StripeElement>
          </React.Fragment>
        ))}
    </StripedList>
  );
}
