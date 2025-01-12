export default function formatNumberChange(
  newValue: number,
  oldValue: number,
  places = 0,
): string {
  if (oldValue === newValue) {
    return "→ flat";
  }
  if (oldValue > newValue) {
    return `↓\xA0${(oldValue - newValue).toFixed(places)}`;
  }
  return `↑\xA0${(newValue - oldValue).toFixed(places)}`;
}
