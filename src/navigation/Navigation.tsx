import React, { useState } from "react";
import { graphql, Link, StaticQuery } from "gatsby";
import { Entry, Group } from "./navigationTypes";

function NavigationSection({
  children,
  hidden,
}: {
  children: any;
  hidden?: boolean;
}) {
  return (
    <div
      className={`text-xl font-bold text-center md:text-left md:border-r last:border-r-0 md:inline-block md:pr-4 md:pl-4 first:pl-0 last:pr-0 ${
        hidden ? "hidden" : ""
      }`}
    >
      {children}
    </div>
  );
}

export const Navigation: React.FunctionComponent<{
  entries: Array<Group | Entry>;
}> = ({ entries }) => {
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
      {anyOpen ? (
        <div className="mb-4 md:hidden md:mb-0">
          <NavigationSection key="return" hidden={!anyOpen}>
            <a className="cursor-pointer" onClick={reset}>
              {openTitle} &larr;
            </a>
          </NavigationSection>
        </div>
      ) : (
        ""
      )}
      <div className="space-y-4 md:space-y-0">
        {entries.map((groupOrEntry) => {
          if (groupOrEntry.type === "entry") {
            const entry = groupOrEntry as Entry;
            return (
              <NavigationSection key={entry.title} hidden={anyOpen}>
                <Link to={entry.slug}>{entry.title}</Link>
              </NavigationSection>
            );
          } else {
            const group = groupOrEntry as Group;
            return (
              <NavigationSection key={group.title} hidden={anyOpen}>
                <a
                  className={`cursor-pointer ${
                    state[group.title] ? "text-green-500" : ""
                  }`}
                  onClick={() => openGroup(group)}
                >
                  {group.title}
                </a>
              </NavigationSection>
            );
          }
        })}
      </div>
      <div>
        {entries
          .filter((groupOrEntry) => groupOrEntry.type === "group")
          .map((group) => (
            <ul
              key={`${group.title}-menu`}
              className={`space-y-4 ${
                state[group.title]
                  ? "md:m-4 md:mt-8 text-center md:text-left"
                  : "hidden"
              }`}
            >
              {(group as Group).entries.map((entry) => (
                <li key={entry.slug}>
                  <Link to={entry.slug}>{entry.title}</Link>
                </li>
              ))}
            </ul>
          ))}
      </div>
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
