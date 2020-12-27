import React from "react";
import { Entry, Group } from "./navigationTypes";
import { Link } from "gatsby";

const NavigationGroup: React.FunctionComponent<
  Group & {
    open: boolean;
    onToggle: () => void;
  }
> = ({ title, entries, open, onToggle }) => (
  <div>
    <a className="block text-xl font-bold cursor-pointer" onClick={onToggle}>
      {title}
    </a>
    <ul className={`overflow-hidden space-y-4 ${open ? "mt-4" : "max-h-0"}`}>
      {entries.map((entry: Entry) => (
        <li key={entry.slug}>
          <Link to={entry.slug}>{entry.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default NavigationGroup;
