export default function formatPercentageChange(
  newValue: number,
  oldValue: number
): string {
  if (oldValue === 0) {
    return "↑ infinite%";
  }
  const percentage = ((newValue - oldValue) / oldValue) * 100;
  if (percentage < 0) {
    return `↓ ${(percentage * -1).toFixed(1)}%`;
  }
  return `↑ ${percentage.toFixed(1)}%`;
}
