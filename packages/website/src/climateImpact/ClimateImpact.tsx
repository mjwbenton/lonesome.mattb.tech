import Tile, { Wall } from "component/Tile";
import { useClimateImpact } from "./climateImpactDataProvider";

export default function ClimateImpact() {
  const { loading, climateImpact } = useClimateImpact();

  return (
    <Wall>
      <Tile>
        <strong>{climateImpact?.trees}</strong> Trees Planted
      </Tile>
      <Tile>
        <strong>{climateImpact?.carbonOffsetTonnes}t</strong> of carbon
        emissions avoided
      </Tile>
    </Wall>
  );
}
