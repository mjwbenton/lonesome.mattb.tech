import React from "react";

export default function EmbeddedWrapper(
  props: Omit<JSX.IntrinsicElements["div"], "className">
) {
  return <div {...props} className="not-prose" />;
}
