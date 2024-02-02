import React from "react";

const Tile = (props: Omit<JSX.IntrinsicElements["div"], "className">) => {
  return <div {...props} className="p-4 bg-light-1 dark:bg-dark-1" />;
};

export default Tile;

export const Wall = (
  props: Omit<JSX.IntrinsicElements["div"], "className">,
) => {
  return <div {...props} className="w-full grid grid-cols-2 gap-4" />;
};
