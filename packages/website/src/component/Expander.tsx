import {
  Disclosure,
  DisclosureContent,
  useDisclosureStore,
} from "@ariakit/react";
import { ChevronsDown } from "react-feather";

export interface ExpanderProps {
  text: string;
  children: React.ReactNode;
}

export default function Expander({ text, children }: ExpanderProps) {
  const disclosure = useDisclosureStore();
  return (
    <>
      <Disclosure className="block" store={disclosure}>
        <ChevronsDown size={14} className="inline-block" />{" "}
        <span className="underline">{text}</span>
      </Disclosure>
      <DisclosureContent store={disclosure}>{children}</DisclosureContent>
    </>
  );
}
