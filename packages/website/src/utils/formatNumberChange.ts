export default function formatNumberChange(
  newValue: number,
  oldValue: number,
  places = 0,
): string {
  if (oldValue === newValue) {
    return "→ flat";
  }
  if (oldValue > newValue) {
    return `↓ ${(oldValue - newValue).toFixed(places)}`;
  }
  return `↑ ${(newValue - oldValue).toFixed(places)}`;
}
