import Link from "next/link";
import React from "react";

export function StripedList(props: JSX.IntrinsicElements["ul"]) {
  return <ul {...props} />;
}

export default StripedList;

const ITEM_CLASSES =
  "striped-list-element bg-light-1 dark:bg-dark-1 dark:odd:bg-dark odd:bg-light";
const LAYOUT_CLASSES = "relative flex p-4 overflow-hidden space-x-4";

export function StripeElement({
  children,
  index,
  href,
}: {
  children: React.ReactNode;
  index: number;
  href?: string;
}) {
  const content = (
    <>
      {children}
      <span className="absolute top-0 left-0 w-full pr-3 -mt-3 text-right striped-index text-9xl">
        {index}
      </span>
    </>
  );
  if (href) {
    return (
      <li className={ITEM_CLASSES}>
        <Link href={href}>
          <a className={LAYOUT_CLASSES}>{content}</a>
        </Link>
      </li>
    );
  } else {
    return <li className={`${ITEM_CLASSES} ${LAYOUT_CLASSES}`}>{content}</li>;
  }
}
