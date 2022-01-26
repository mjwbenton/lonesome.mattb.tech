export default function Spinner({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div role="presentation" className="relative w-8 h-8 animate-spin-slow">
        <Circle className="rotate-[0deg]" />
        <Circle className="rotate-[15deg]" />
        <Circle className="rotate-[30deg]" />
        <Circle className="rotate-[45deg]" />
        <Circle className="rotate-[60deg]" />
        <Circle className="rotate-[75deg]" />
        <Circle className="rotate-[90deg]" />
        <Circle className="rotate-[105deg]" />
        <Circle className="rotate-[120deg]" />
        <Circle className="rotate-[135deg]" />
        <Circle className="rotate-[150deg]" />
        <Circle className="rotate-[165deg]" />
      </div>
    </div>
  );
}

export function TopRightSpinner({ show = true }: { show?: boolean }) {
  return show ? (
    <div className="relative h-0 w-full">
      <Spinner className="absolute top-[-12px] right-[-12px]" />
    </div>
  ) : null;
}

function Circle({ className }) {
  return (
    <div
      role="presentation"
      className={`absolute top-0 left-3.5 w-1 h-8 border rounded-sm border-accent-light dark:border-accent-dark ${className}`}
    />
  );
}
