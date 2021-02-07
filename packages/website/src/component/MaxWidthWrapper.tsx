import React from "react";

export default function MaxWithWrapper(
  props: Omit<JSX.IntrinsicElements["div"], "className">
) {
  return <div {...props} className="max-w-65ch" />;
}
