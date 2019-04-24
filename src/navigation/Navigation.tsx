import React, { useState } from "react";
import { graphql, StaticQuery } from "gatsby";
import NavigationGroup from "./NavigationGroup";
import NavigationSingle from "./NavigationSingle";
import { Column, Entry, Group } from "./navigationTypes";
import NavigationWrapper from "./NavigationWrapper";
import NavigationColumn from "./NavigationColumn";
import flatMap from "lodash.flatmap";

export const Navigation: React.FunctionComponent<{
  columns: Array<Column>;
}> = ({ columns }) => {
  const [state, setState] = useState(() => {
    return flatMap(columns, column => column)
      .filter(groupOrEntry => groupOrEntry.type === "group")
      .map(group => group.title)
      .reduce((groupMap, groupName) => {
        groupMap[groupName] = false;
        return groupMap;
      }, {});
  });

  return (
    <NavigationWrapper>
      {columns.map((column, i) => (
        <NavigationColumn key={i}>
          {column.map(groupOrEntry => {
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
                    Object.keys(state).forEach(gN => (newState[gN] = false));
                    newState[group.title] = !state[group.title];
                    setState(newState);
                  }}
                />
              );
            }
          })}
        </NavigationColumn>
      ))}
    </NavigationWrapper>
  );
};

function responseToColumns(data: DataType): Array<Column> {
  const orderedNodes = data.allMarkdownRemark.edges
    .map(edge => edge.node)
    .filter(node => node.fields.slug)
    .sort(
      (a, b) =>
        parseInt(a.frontmatter.index || "0") -
        parseInt(b.frontmatter.index || "0")
    );
  const navigationColumns = data.site.siteMetadata.navigationColumns;
  return navigationColumns.map(column =>
    column.map(groupOrNodeName => {
      const groupNodes = orderedNodes.filter(
        node => node.frontmatter.group == groupOrNodeName
      );
      const entryNode = orderedNodes.find(
        node => node.frontmatter.title == groupOrNodeName
      );
      if (entryNode && groupNodes.length) {
        throw new Error(
          `Cannot have a group with the same name as an entry. Name: ${groupOrNodeName}`
        );
      }
      if (entryNode) {
        return {
          type: "entry",
          title: groupOrNodeName,
          slug: entryNode.fields.slug!
        } as Entry;
      } else {
        return {
          type: "group",
          title: groupOrNodeName,
          entries: groupNodes.map(
            node =>
              ({
                type: "entry",
                title: node.frontmatter.title!,
                slug: node.fields.slug!
              } as Entry)
          )
        } as Group;
      }
    })
  );
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
      navigationColumns: Array<Array<string>>;
    };
  };
};

export default () => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            navigationColumns
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
      <Navigation columns={responseToColumns(data)} />
    )}
  />
);
