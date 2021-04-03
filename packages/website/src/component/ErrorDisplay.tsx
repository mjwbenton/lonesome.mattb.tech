export default function ErrorDisplay({ error }: { error: Error | undefined }) {
  return error ? (
    <p className="mb-8 text-dark-3 dark:text-light-3">{error.toString()}</p>
  ) : null;
}
