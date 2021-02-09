import React from "react";

export function StripedList(props: JSX.IntrinsicElements["ul"]) {
  return <ul {...props} />;
}

export default StripedList;

export const StripeElement = ({ children, index }) => (
  <li className="relative flex p-4 overflow-hidden bg-light-1 dark:bg-dark-1 striped-list-element dark:odd:bg-dark odd:bg-light space-x-4">
    {children}
    <span className="absolute top-0 left-0 w-full pr-3 -mt-5 text-right striped-index text-9xl">
      {index}
    </span>
  </li>
);
