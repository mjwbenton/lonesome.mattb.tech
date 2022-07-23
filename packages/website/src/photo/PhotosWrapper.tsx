import React from "react";

export default function PhotosWrapper(
  props: Omit<JSX.IntrinsicElements["div"], "className">
) {
  return (
    <div
      {...props}
      className="not-prose flex flex-col items-start w-screen -ml-4 md:-ml-8 space-y-16 mt-16 mb-16"
    />
  );
}
