import React, { useState } from "react";
import { graphql, Link, StaticQuery } from "gatsby";
import { Entry, Group } from "./navigationTypes";
import { Clickable, Composite, CompositeItem, useCompositeState } from "reakit";

function navSectionClasses(hidden: boolean | undefined) {
  return `block w-full cursor-pointer text-xl font-bold text-center md:text-left md:border-r last:border-r-0 md:w-auto md:inline-block md:pr-4 md:pl-4 first:pl-0 last:pr-0 ${
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
    <nav className="p-4 bg-gray-100 border-t-4 border-green-500">
      <Composite
        {...mainComposite}
        className="space-y-4 md:space-y-0"
        aria-label="Main Navigation"
      >
        {entries.map((groupOrEntry) => {
          if (groupOrEntry.type === "entry") {
            const entry = groupOrEntry as Entry;
            return (
              <CompositeItem {...mainComposite} key={entry.title}>
                {(props) => (
                  <Link
                    {...props}
                    className={navSectionClasses(anyOpen)}
                    to={entry.slug}
                  >
                    {entry.title}
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
                      state[group.title] ? "text-green-500" : ""
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
                    <Link
                      {...props}
                      to={entry.slug}
                      className="block w-full text-center md:text-left"
                    >
                      {entry.title}
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

function responseToEntries(data: DataType): Array<Group | Entry> {
  const orderedNodes = data.allMarkdownRemark.edges
    .map((edge) => edge.node)
    .filter((node) => node.fields.slug)
    .sort(
      (a, b) =>
        parseInt(a.frontmatter.index || "0") -
        parseInt(b.frontmatter.index || "0")
    );
  const navigationOrder = data.site.siteMetadata.navigationOrder;
  return navigationOrder.map((groupOrEntryName) => {
    const groupNodes = orderedNodes.filter(
      (node) => node.frontmatter.group == groupOrEntryName
    );
    const entryNode = orderedNodes.find(
      (node) => node.frontmatter.title == groupOrEntryName
    );
    if (entryNode && groupNodes.length) {
      throw new Error(
        `Cannot have a group with the same name as an entry. Name: ${groupOrEntryName}`
      );
    }
    if (entryNode) {
      return {
        type: "entry",
        title: groupOrEntryName,
        slug: entryNode.fields.slug!,
      } as Entry;
    } else {
      return {
        type: "group",
        title: groupOrEntryName,
        entries: groupNodes.map(
          (node) =>
            ({
              type: "entry",
              title: node.frontmatter.title!,
              slug: node.fields.slug!,
            } as Entry)
        ),
      } as Group;
    }
  });
}

type DataType = {
  allMarkdownRemark: {
    edges: Array<{
      node: {
        fields: {
          slug?: string;
        };
        frontmatter: {
          title?: string;
          index?: string;
          group?: string;
        };
      };
    }>;
  };
  site: {
    siteMetadata: {
      navigationOrder: Array<string>;
    };
  };
};

export default () => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            navigationOrder
          }
        }
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                index
                group
              }
            }
          }
        }
      }
    `}
    render={(data: DataType) => (
      <Navigation entries={responseToEntries(data)} />
    )}
  />
);
