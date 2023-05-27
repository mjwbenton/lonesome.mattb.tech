import { RiDropLine, RiWalkLine } from "react-icons/ri";

export type ActivityType = keyof typeof ACTIVITY_TYPE_CONFIG;

export const ACTIVITY_TYPE_CONFIG = {
  walking: {
    dataKey: "walkingRunningDistance",
    icon: RiWalkLine,
    verb: "walked",
  },
  swimming: {
    dataKey: "swimmingDistance",
    icon: RiDropLine,
    verb: "swam",
  },
} as const;
