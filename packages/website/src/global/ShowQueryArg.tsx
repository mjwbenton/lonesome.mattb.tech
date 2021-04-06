import { useRouter } from "next/router";

export default function ShowQueryArg({ arg }: { arg: string }): string | null {
  const router = useRouter();
  return (router?.query[arg] as string) ?? null;
}
