export default function Message({ children }: { children: React.ReactNode }) {
  return <p className="mb-8 text-dark-3 dark:text-light-3">{children}</p>;
}
