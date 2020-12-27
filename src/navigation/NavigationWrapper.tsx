import React from "react";

export default function NavigationWrapper(
  props: Omit<JSX.IntrinsicElements["div"], "className">
) {
  return (
    <div
      {...props}
      className="flex flex-col flex-wrap justify-center p-4 text-center bg-gray-100 border-t border-gray-800 border-dotted sm:flex-row"
    />
  );
}
