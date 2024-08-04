import { RiDropLine, RiWalkLine } from "react-icons/ri";

export type ActivityType = keyof typeof ACTIVITY_TYPE_CONFIG;

export const ACTIVITY_TYPE_CONFIG = {
  walking: {
    icon: RiWalkLine,
    verb: "walked",
  },
  swimming: {
    icon: RiDropLine,
    verb: "swam",
  },
} as const;
