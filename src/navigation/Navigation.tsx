import React, { useState } from "react";
import { graphql, StaticQuery } from "gatsby";
import NavigationGroup from "./NavigationGroup";
import NavigationSingle from "./NavigationSingle";
import { Entry, Group } from "./navigationTypes";
import NavigationWrapper from "./NavigationWrapper";

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

  return (
    <NavigationWrapper>
      {entries.map((groupOrEntry) => {
        if (groupOrEntry.type === "entry") {
          const entry = groupOrEntry as Entry;
          return <NavigationSingle {...entry} key={entry.title} />;
        } else {
          const group = groupOrEntry as Group;
          return (
            <NavigationGroup
              {...group}
              key={group.title}
              open={state[group.title]}
              onToggle={() => {
                const newState = {};
                Object.keys(state).forEach((gN) => (newState[gN] = false));
                newState[group.title] = !state[group.title];
                setState(newState);
              }}
            />
          );
        }
      })}
    </NavigationWrapper>
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
