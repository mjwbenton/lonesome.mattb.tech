import React from "react";

export default function NavigationWrapper(
  props: Omit<JSX.IntrinsicElements["div"], "className">
) {
  return (
    <div
      {...props}
      className="flex flex-col flex-wrap justify-center p-4 text-center bg-gray-100 border-t-4 border-green-500 sm:flex-row"
    />
  );
}
