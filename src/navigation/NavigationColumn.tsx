import React from "react";

export default function NavigationColumn(
  props: Omit<JSX.IntrinsicElements["div"], "className">
) {
  return <div {...props} className="flex-1 mx-4" />;
}
