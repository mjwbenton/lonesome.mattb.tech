import React from "react";

export default function NavigationSection({
  children,
  hidden,
}: {
  children: any;
  hidden?: boolean;
}) {
  return (
    <div
      className={`block md:border-r last:border-r-0 md:inline-block md:w-32 ${
        hidden ? "hidden" : ""
      }`}
    >
      {children}
    </div>
  );
}
