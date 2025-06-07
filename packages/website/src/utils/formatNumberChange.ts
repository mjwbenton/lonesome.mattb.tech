export default function formatNumberChange(
  newValue: number,
  oldValue: number,
  formatter: (value: number) => string = (value) => value.toFixed(0),
): string {
  if (oldValue === newValue) {
    return "→ flat";
  }
  if (oldValue > newValue) {
    return `↓\xA0${formatter(oldValue - newValue)}`;
  }
  return `↑\xA0${formatter(newValue - oldValue)}`;
}
