import Icon from "component/Icon";
import Tile from "component/Tile";
import formatPercentageChange from "utils/formatPercentageChange";
import { ActivityType, ACTIVITY_TYPE_CONFIG } from "./activityTypes";

export type Period = "trailing30" | "year";

const PERIOD_TO_LABEL = {
  trailing30: "in the last 30 days",
  year: "so far this year",
};

export type ActivityTileProps = {
  type: ActivityType;
  period: Period;
  km: number | undefined;
  lastYearKm: number | undefined;
};

export default function ActivityTile({
  type,
  period,
  km,
  lastYearKm,
}: ActivityTileProps) {
  return (
    <Tile>
      <Icon component={ACTIVITY_TYPE_CONFIG[type].icon} />
      <strong>{formatKm(km ?? 0)}</strong> {ACTIVITY_TYPE_CONFIG[type].verb}{" "}
      {PERIOD_TO_LABEL[period]}
      <br />
      <span className="text-xs">
        {formatPercentageChange(km ?? 0, lastYearKm ?? 0)} change on the same
        time last year
      </span>
    </Tile>
  );
}

export function formatKm(value: number): string {
  return `${value.toFixed(2)}km`;
}
