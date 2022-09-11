import preval from "next-plugin-preval";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";
import { Config } from "tailwindcss";

export default preval(
  removeUndefined(
    resolveConfig(tailwindConfig as unknown as Config).theme
  ) as Required<Required<Config>["theme"]>
);

function removeUndefined(obj) {
  if (typeof obj === "object") {
    return Object.entries(obj)
      .filter(([_, v]) => v !== undefined)
      .reduce(
        (acc, [key, value]) => ({ ...acc, [key]: removeUndefined(value) }),
        {}
      );
  }
  return obj;
}
