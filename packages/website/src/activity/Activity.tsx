import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import Tile, { Wall } from "component/Tile";
import { useActivity } from "./activityDataProvider";
import { RiDropLine, RiWalkLine } from "react-icons/ri";
import Icon from "component/Icon";

export default function Activity() {
  const { loading, activity } = useActivity();

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <Wall>
        <Tile>
          <Icon component={RiWalkLine} />
          <strong>{activity?.trailing30.walkingRunningKm}</strong> walked in the
          last 30 days
          <br />
          <span className="text-xs">
            {activity?.trailing30.walkingRunningPercentageChange} change on the
            same time last year
          </span>
        </Tile>
        <Tile>
          <Icon component={RiDropLine} />
          <strong>{activity?.trailing30.swimmingDistanceKm}</strong> swam in the
          last 30 days
          <br />
          <span className="text-xs">
            {activity?.trailing30.swimmingDistancePercentageChange} change on
            the same time last year
          </span>
        </Tile>
        <Tile>
          <Icon component={RiWalkLine} />
          <strong>{activity?.year.walkingRunningKm}</strong> walked so far this
          year
          <br />
          <span className="text-xs">
            {activity?.year.walkingRunningPercentageChange} change on the same
            time last year
          </span>
        </Tile>
        <Tile>
          <Icon component={RiDropLine} />
          <strong>{activity?.year.swimmingDistanceKm}</strong> swam so far this
          year
          <br />
          <span className="text-xs">
            {activity?.year.swimmingDistancePercentageChange} change on the same
            time last year
          </span>
        </Tile>
      </Wall>
    </EmbeddedWrapper>
  );
}
