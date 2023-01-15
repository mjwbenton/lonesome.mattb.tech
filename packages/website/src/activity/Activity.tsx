import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import Tile, { Wall } from "component/Tile";
import { useActivity } from "./activityDataProvider";

export default function Activity() {
  const { loading, activity } = useActivity();

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <Wall>
        <Tile>
          <strong>{activity?.walkingRunningDistance.km.toFixed(2)}</strong>km
          walked
        </Tile>
        <Tile>
          <strong>{activity?.swimmingDistance.km.toFixed(2)}</strong>km swam
        </Tile>
      </Wall>
    </EmbeddedWrapper>
  );
}
