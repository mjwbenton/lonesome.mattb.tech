import { Button as AriakitButton } from "@ariakit/react";

export default function Button({
  children,
  onClick,
  disabled = false,
  ...rest
}) {
  return (
    <AriakitButton
      onClick={onClick}
      disabled={disabled}
      className="disabled:opacity-50 bg-accent-dark dark:bg-accent-light border-accent-dark-1 dark:border-accent-light-1 border-4 rounded-lg text-light-1 px-2 py-1"
      {...rest}
    >
      {children}
    </AriakitButton>
  );
}
