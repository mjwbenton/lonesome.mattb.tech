import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import { Wall } from "component/Tile";
import ActivityBarChart from "./ActivityBarChart";
import ActivityAccumulationChart from "./ActivityAccumulationChart";
import { useActivityPage } from "./activityPageDataProvider";
import ActivityTile from "./ActivityTile";
import Expander from "component/Expander";
import ActivityRecentData from "./ActivityRecentData";
import { ActivityType, ACTIVITY_TYPE_CONFIG } from "./activityTypes";

export default function ActivityPageSection({ type }: { type: ActivityType }) {
  const { activity, loading } = useActivityPage();

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <div className="space-y-12">
        <Wall>
          <ActivityTile
            type={type}
            period="trailing30"
            km={activity?.trailing30Days[ACTIVITY_TYPE_CONFIG[type].dataKey].km}
            lastYearKm={
              activity?.lastYearTrailing30Days[
                ACTIVITY_TYPE_CONFIG[type].dataKey
              ].km
            }
          />
          <ActivityTile
            type={type}
            period="year"
            km={activity?.thisYear[ACTIVITY_TYPE_CONFIG[type].dataKey].km}
            lastYearKm={
              activity?.lastYearToDate[ACTIVITY_TYPE_CONFIG[type].dataKey].km
            }
          />
        </Wall>
        <ActivityBarChart
          data={{
            thisYear:
              activity?.thisYear[ACTIVITY_TYPE_CONFIG[type].dataKey].months ??
              [],
            lastYear:
              activity?.lastYear[ACTIVITY_TYPE_CONFIG[type].dataKey].months ??
              [],
          }}
        />
        <ActivityAccumulationChart
          data={{
            thisYear:
              activity?.thisYear[ACTIVITY_TYPE_CONFIG[type].dataKey].days ?? [],
            lastYear:
              activity?.lastYear[ACTIVITY_TYPE_CONFIG[type].dataKey].days ?? [],
          }}
        />
        <Expander text="Recent Data">
          <ActivityRecentData
            type={type}
            data={
              activity?.thisYear[ACTIVITY_TYPE_CONFIG[type].dataKey].days ?? []
            }
          />
        </Expander>
      </div>
    </EmbeddedWrapper>
  );
}
