import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import Tile, { Wall } from "component/Tile";
import { useEnergyUsage } from "./energyUsageDataProvider";
import {
  RiFlashlightLine,
  RiFireLine,
  RiAlertLine,
  RiWindyLine,
  RiTempHotLine,
} from "react-icons/ri";
import Icon from "component/Icon";

const COAL_GAS = ["coal", "gas"];
const RENEWABLES = ["solar", "wind", "hydro", "nuclear"];

export default function Activity() {
  const { loading, data } = useEnergyUsage();

  const energyThisYear = data?.energyThisYear;
  const energyLast30Days = data?.energyLast30Days;

  const { coalGas, renewables } = sumMix(energyThisYear?.electricity.mix ?? []);

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <Wall>
        <Tile>
          <Icon component={RiFlashlightLine} />
          <strong>
            {Math.round(energyLast30Days?.electricity.usage ?? 0)}kwH
          </strong>{" "}
          of electricity used in the last 30 days
          <ResultingIn value={energyLast30Days?.electricity.emissions} />
          <MissingData show={energyLast30Days?.electricity.missingData} />
        </Tile>
        <Tile>
          <Icon component={RiTempHotLine} />
          <strong>{Math.round(energyLast30Days?.gas.usage ?? 0)}kwH</strong> of
          gas used in the last 30 days
          <ResultingIn value={energyLast30Days?.gas.emissions} />
          <MissingData show={energyLast30Days?.gas.missingData} />
        </Tile>
        <Tile>
          <Icon component={RiFlashlightLine} />
          <strong>
            {Math.round(energyThisYear?.electricity.usage ?? 0)}kwH
          </strong>{" "}
          of electricity used so far this year
          <ResultingIn value={energyThisYear?.electricity.emissions} />
          <MissingData show={energyThisYear?.electricity.missingData} />
        </Tile>
        <Tile>
          <Icon component={RiTempHotLine} />
          <strong>{Math.round(energyThisYear?.gas.usage ?? 0)}kwH</strong> of
          gas used so far this year
          <ResultingIn value={energyThisYear?.gas.emissions} />
          <MissingData show={energyThisYear?.gas.missingData} />
        </Tile>
        <Tile>
          <Icon component={RiFireLine} />
          <strong>{coalGas}</strong>% of electricity from coal or gas this year
        </Tile>
        <Tile>
          <Icon component={RiWindyLine} />
          <strong>{renewables}</strong>% of electricity from solar, wind, hydro
          or nuclear
        </Tile>
      </Wall>
    </EmbeddedWrapper>
  );
}

function sumMix(
  mix: readonly { readonly fuel: string; readonly percentage: number }[],
): {
  coalGas: number;
  renewables: number;
} {
  const { coalGas, renewables } = mix.reduce(
    (acc, { fuel, percentage }) => {
      if (COAL_GAS.includes(fuel)) {
        acc.coalGas += percentage;
      } else if (RENEWABLES.includes(fuel)) {
        acc.renewables += percentage;
      }
      return acc;
    },
    { coalGas: 0, renewables: 0 },
  );
  return {
    coalGas: Math.round(coalGas * 10) / 10,
    renewables: Math.round(renewables * 10) / 10,
  };
}

function ResultingIn({ value }: { value: number | undefined }) {
  return (
    <>
      <br />
      <span className="text-xs">
        resulting in {Math.round(value ?? 0)}kg of CO2e
      </span>
    </>
  );
}

function MissingData({ show }: { show: boolean | undefined }) {
  return Boolean(show) ? (
    <>
      <br />
      <span className="text-xs">
        <Icon size="small" component={RiAlertLine} />
        missing data
      </span>
    </>
  ) : null;
}
