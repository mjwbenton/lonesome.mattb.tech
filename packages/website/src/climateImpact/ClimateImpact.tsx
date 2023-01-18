import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import Tile, { Wall } from "component/Tile";
import { useClimateImpact } from "./climateImpactDataProvider";
import { RiLeafLine, RiBuilding3Line } from "react-icons/ri";
import Icon from "component/Icon";

export default function Activity() {
  const { loading, climateImpact } = useClimateImpact();

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <Wall>
        <Tile>
          <Icon component={RiLeafLine} />
          <strong>{climateImpact?.trees}</strong> Trees Planted
        </Tile>
        <Tile>
          <Icon component={RiBuilding3Line} />
          <strong>{climateImpact?.carbonOffsetTonnes}t</strong> of carbon
          emissions avoided
        </Tile>
      </Wall>
    </EmbeddedWrapper>
  );
}
