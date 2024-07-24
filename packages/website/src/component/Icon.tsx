import { IconBaseProps } from "react-icons/lib";

const SIZE_MAP = {
  default: {
    size: 18,
    className: "-top-[1px] mr-2",
  },
  small: {
    size: 14,
    className: "mr-2",
  },
  xsmall: {
    size: 12,
    className: "-top-[1px] mr-1",
  },
} as const;

export default function Icon({
  component,
  size = "default",
}: {
  component: React.FC<IconBaseProps>;
  size?: keyof typeof SIZE_MAP;
}) {
  const Component = component;
  return (
    <Component
      size={SIZE_MAP[size].size}
      className={`inline relative ${SIZE_MAP[size].className}`}
    />
  );
}
