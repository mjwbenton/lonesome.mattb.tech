import { Button as ReakitButton } from "reakit";

export default function Button({ children, onClick }) {
  return (
    <ReakitButton
      onClick={onClick}
      className="bg-accent-dark dark:bg-accent-light border-accent-dark-1 dark:border-accent-light-1 border-4 rounded-lg text-light-1 px-2 py-1"
    >
      {children}
    </ReakitButton>
  );
}
