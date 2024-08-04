import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import { Wall } from "component/Tile";
import ActivityBarChart from "./ActivityBarChart";
import ActivityAccumulationChart from "./ActivityAccumulationChart";
import { useActivityPage } from "./activityPageDataProvider";
import ActivityTile from "./ActivityTile";
import Expander from "component/Expander";
import ActivityRecentData from "./ActivityRecentData";

export default function SwimmingSection() {
  const { activity, loading } = useActivityPage();

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <div className="space-y-12">
        <Wall>
          <ActivityTile
            type="swimming"
            period="trailing30"
            km={activity?.trailing30Days.swimmingDistance.km}
            lastYearKm={activity?.lastYearTrailing30Days.swimmingDistance.km}
          />
          <ActivityTile
            type="swimming"
            period="year"
            km={activity?.thisYear.swimmingDistance.km}
            lastYearKm={activity?.lastYearToDate.swimmingDistance.km}
          />
        </Wall>
        <ActivityBarChart
          data={{
            thisYear: activity?.thisYear.swimmingDistance.months ?? [],
            lastYear: activity?.lastYear.swimmingDistance.months ?? [],
          }}
        />
        <ActivityAccumulationChart
          data={{
            thisYear: activity?.thisYear.swimmingDistance.days ?? [],
            lastYear: activity?.lastYear.swimmingDistance.days ?? [],
          }}
        />
        <Expander text="Recent Data">
          <ActivityRecentData
            type="swimming"
            data={activity?.thisYear.swimmingDistance.days ?? []}
          />
        </Expander>
      </div>
    </EmbeddedWrapper>
  );
}
