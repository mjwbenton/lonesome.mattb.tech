import {
  useDisclosureState,
  Disclosure,
  DisclosureContent,
} from "reakit/Disclosure";
import { ChevronsDown as DownIcon, ChevronsUp as UpIcon } from "react-feather";

export interface ExpanderProps {
  text: string;
  children: React.ReactNode;
  defaultVisible?: boolean;
}

export default function Expander({
  text,
  children,
  defaultVisible = false,
}: ExpanderProps) {
  const disclosure = useDisclosureState({ visible: defaultVisible });
  const Icon = disclosure.visible ? UpIcon : DownIcon;
  return (
    <>
      <Disclosure {...disclosure}>
        <Icon size={14} className="inline-block" />{" "}
        <span className="underline">{text}</span>
      </Disclosure>
      <DisclosureContent {...disclosure}>
        {(props) => disclosure.visible && <div {...props}>{children}</div>}
      </DisclosureContent>
    </>
  );
}
