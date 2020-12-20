import React from "react";

export function StripedList(props: JSX.IntrinsicElements["ul"]) {
  return <ul {...props} />;
}

export default StripedList;

export const StripeElement = ({ children, index }) => (
  <li className="relative z-10 flex p-4 overflow-hidden bg-gray-100 striped-list-element odd:bg-white space-x-4">
    {children}
    <span className="absolute top-0 left-0 z-0 w-full pr-2 -mt-6 text-right striped-index text-9xl">
      {index}
    </span>
  </li>
);
