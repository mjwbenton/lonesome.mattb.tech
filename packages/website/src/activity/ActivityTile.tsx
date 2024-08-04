import Icon from "component/Icon";
import Tile from "component/Tile";
import formatPercentageChange from "utils/formatPercentageChange";
import { IconBaseProps } from "react-icons";
import { formatKm } from "./format";

export type Period = "trailing30" | "year";

const PERIOD_TO_LABEL = {
  trailing30: "in the last 30 days",
  year: "so far this year",
};

export type ActivityTileProps = {
  icon: React.FC<IconBaseProps>;
  verb: string;
  period: Period;
  km: number | undefined;
  lastYearKm: number | undefined;
};

export default function ActivityTile({
  icon: IconComponent,
  verb,
  period,
  km,
  lastYearKm,
}: ActivityTileProps) {
  return (
    <Tile>
      <Icon component={IconComponent} />
      <strong>{formatKm(km ?? 0)}</strong> {verb} {PERIOD_TO_LABEL[period]}
      <br />
      <span className="text-xs">
        {formatPercentageChange(km ?? 0, lastYearKm ?? 0)} change on the same
        time last year
      </span>
    </Tile>
  );
}
