import React from "react";

const ContentBlock = (
  props: Omit<JSX.IntrinsicElements["div"], "className">,
) => {
  return (
    <div
      {...props}
      className="mb-8 border-t-4 border-accent-light dark:border-accent-dark"
    />
  );
};

export default ContentBlock;
