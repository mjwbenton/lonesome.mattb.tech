import themeValues from "style/theme.preval";
import { useTheme } from "next-themes";

export default function useChartTheme() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const fontFamily = Object.values(themeValues.fontFamily["mono"])
    .map((font) => `'${font}'`)
    .join(", ");
  const colorLastYear = themeValues.colors["accent-dark"][1];
  const colorThisYear = themeValues.colors["accent-light"]["DEFAULT"];
  const fontSmall = 10;
  const fontBase = 12;
  const tooltipBackground = isDark
    ? themeValues.colors["dark"]["1"]
    : themeValues.colors["light"]["1"];
  const baseColor = isDark
    ? themeValues.colors["light"]["1"]
    : themeValues.colors["dark"]["1"];

  return {
    fontFamily,
    colorLastYear,
    colorThisYear,
    fontSmall,
    fontBase,
    tooltipBackground,
    baseColor,
  };
}
