import React, { useState } from "react";
import Link from "next/link";
import { Entry, Group } from "./navigationTypes";
import { Clickable, Composite, CompositeItem, useCompositeState } from "reakit";

function navSectionClasses(hidden: boolean | undefined) {
  return `block w-full cursor-pointer text-lg text-center font-normal md:text-left md:w-auto md:inline-block md:pr-4 md:pl-4 first:pl-0 last:pr-0 ${
    hidden ? "hidden" : ""
  }`;
}

export const Navigation: React.FunctionComponent<{
  entries: Array<Group | Entry>;
}> = ({ entries }) => {
  const mainComposite = useCompositeState();

  const [state, setState] = useState(() => {
    return entries
      .filter((groupOrEntry) => groupOrEntry.type === "group")
      .map((group) => group.title)
      .reduce((groupMap, groupName) => {
        groupMap[groupName] = false;
        return groupMap;
      }, {});
  });

  const openGroup = ({ title }) => {
    const newState = {};
    Object.keys(state).forEach((gN) => (newState[gN] = false));
    newState[title] = !state[title];
    setState(newState);
  };

  const reset = () => {
    const newState = {};
    Object.keys(state).forEach((gN) => (newState[gN] = false));
    setState(newState);
  };

  const anyOpen = Object.keys(state).some((key) => state[key]);
  const openTitle = Object.keys(state).find((key) => state[key]);

  return (
    <nav className="p-4 border-t-4 bg-light-1 border-accent-light dark:border-accent-dark dark:bg-dark-1">
      <Composite
        {...mainComposite}
        className="space-y-4 md:space-y-0 md:divide-x divide-light-2 dark:divide-gray-700"
        aria-label="Main Navigation"
      >
        {entries.map((groupOrEntry) => {
          if (groupOrEntry.type === "entry") {
            const entry = groupOrEntry as Entry;
            return (
              <CompositeItem {...mainComposite} key={entry.title}>
                {(props) => (
                  <Link href={entry.slug}>
                    <a {...props} className={navSectionClasses(anyOpen)}>
                      {entry.title}
                    </a>
                  </Link>
                )}
              </CompositeItem>
            );
          } else {
            const group = groupOrEntry as Group;
            return (
              <CompositeItem {...mainComposite} key={group.title}>
                {(props) => (
                  <Clickable
                    {...props}
                    className={`${navSectionClasses(anyOpen)} ${
                      state[group.title]
                        ? "text-accent-light-1 dark:text-accent-dark-1"
                        : ""
                    }`}
                    onClick={() => openGroup(group)}
                    aria-expanded={state[group.title] ? "true" : "false"}
                    aria-controls={`${group.title}-menu`}
                  >
                    {group.title}
                  </Clickable>
                )}
              </CompositeItem>
            );
          }
        })}
      </Composite>
      {entries
        .filter((groupOrEntry) => groupOrEntry.type === "group")
        .map((group) => {
          const subMenuComposite = useCompositeState();
          return (
            <Composite
              {...subMenuComposite}
              key={`${group.title}-menu`}
              id={`${group.title}-menu`}
              className={`space-y-4 ${
                state[group.title]
                  ? "md:m-4 md:mt-8 text-center md:text-left"
                  : "hidden"
              }`}
              aria-label={`${group.title} Navigation`}
            >
              <Clickable
                onClick={reset}
                className={`${navSectionClasses(!anyOpen)} md:hidden`}
                key="reset"
                aria-label={`Close ${openTitle}`}
              >
                {openTitle} &larr;
              </Clickable>
              {(group as Group).entries.map((entry) => (
                <CompositeItem {...subMenuComposite} key={entry.slug}>
                  {(props) => (
                    <Link href={entry.slug}>
                      <a
                        {...props}
                        className="block w-full text-center md:text-left"
                      >
                        {entry.title}
                      </a>
                    </Link>
                  )}
                </CompositeItem>
              ))}
            </Composite>
          );
        })}
    </nav>
  );
};

export default Navigation;
