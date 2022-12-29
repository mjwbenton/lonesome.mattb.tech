import { IconBaseProps } from "react-icons/lib";

export default function Icon({
  component,
}: {
  component: React.FC<IconBaseProps>;
}) {
  const Component = component;
  return <Component size={18} className="inline relative -top-[1px] mr-2" />;
}
