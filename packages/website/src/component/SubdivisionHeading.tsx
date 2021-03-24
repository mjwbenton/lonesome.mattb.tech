export default function SubdivisionHeading({ children }: { children: string }) {
  return (
    <div
      role="presentation"
      className="max-w-65ch relative mt-12 border-t-4 border-accent-light dark:border-accent-dark"
    >
      <h2 className="relative -top-5 pr-4 text-3xl bg-light dark:bg-dark inline-block">
        {children}
      </h2>
    </div>
  );
}
