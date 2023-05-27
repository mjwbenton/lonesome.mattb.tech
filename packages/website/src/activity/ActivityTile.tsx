import Icon from "component/Icon";
import Tile from "component/Tile";
import { RiDropLine, RiWalkLine } from "react-icons/ri";
import formatPercentageChange from "utils/formatPercentageChange";

export type ActivityType = "walking" | "swimming";
export type Period = "trailing30" | "year";

const TYPE_TO_ICON = {
  walking: RiWalkLine,
  swimming: RiDropLine,
};

const TYPE_TO_VERB = {
  walking: "walked",
  swimming: "swam",
};

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
      <Icon component={TYPE_TO_ICON[type]} />
      <strong>{formatKm(km ?? 0)}</strong> {TYPE_TO_VERB[type]}{" "}
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
