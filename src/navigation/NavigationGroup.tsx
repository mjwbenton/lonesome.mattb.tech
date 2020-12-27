import React from "react";
import { Entry, Group } from "./navigationTypes";
import { Link } from "gatsby";
import NavigationHead from "./NavigationHead";

const NavigationGroup: React.FunctionComponent<
  Group & {
    open: boolean;
    onToggle: () => void;
  }
> = ({ title, entries, open, onToggle }) => (
  <div>
    <NavigationHead onClick={onToggle}>{title}</NavigationHead>
    <ul className={`overflow-hidden ${open ? "" : "max-h-0"}`}>
      {entries.map((entry: Entry) => (
        <li className="pb-4" key={entry.slug}>
          <Link
            className="italic text-gray-800 no-underline visited:text-gray-800"
            to={entry.slug}
          >
            {entry.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default NavigationGroup;
