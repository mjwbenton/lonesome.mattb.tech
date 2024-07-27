export function isShareMode() {
  return process.env.SHARE_MODE == "true";
}

export function NoShareMode({ children }: { children: React.ReactNode }) {
  return isShareMode() ? null : <>{children}</>;
}

export function ShareMode({ children }: { children: React.ReactNode }) {
  return isShareMode() ? <>{children}</> : null;
}
