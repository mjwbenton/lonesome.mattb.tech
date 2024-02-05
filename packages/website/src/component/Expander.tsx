import {
  Disclosure,
  DisclosureContent,
  useDisclosureStore,
} from "@ariakit/react";
import { ChevronsDown as DownIcon, ChevronsUp as UpIcon } from "react-feather";

export interface ExpanderProps {
  text: string;
  children: React.ReactNode;
}

export default function Expander({ text, children }: ExpanderProps) {
  const disclosure = useDisclosureStore();
  const Icon = disclosure.getState().open ? UpIcon : DownIcon;
  return (
    <>
      <Disclosure store={disclosure}>
        <Icon size={14} className="inline-block" />{" "}
        <span className="underline">{text}</span>
      </Disclosure>
      <DisclosureContent store={disclosure}>{children}</DisclosureContent>
    </>
  );
}
