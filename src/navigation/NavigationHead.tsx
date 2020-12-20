import React from "react";

export default function NavigationHead(
  props: Omit<JSX.IntrinsicElements["a"], "className">
) {
  return (
    <a
      {...props}
      className="block mb-4 text-xl font-bold text-gray-800 no-underline cursor-pointer last:mb-0"
    />
  );
}
