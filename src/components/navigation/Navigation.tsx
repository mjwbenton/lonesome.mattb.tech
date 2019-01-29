import * as React from "react";
import { graphql, StaticQuery } from "gatsby";
import NavigationGroup from "./NavigationGroup";
import NavigationSingleLink from "./NavigationSingleLink";
import { Node } from "./Node";

class Navigation extends React.Component<
  { data: DataType },
  { [groupName: string]: boolean }
> {
  constructor(props: { data: DataType }) {
    super(props);
    const { groups } = responseToNavigationData(props.data);
    this.state = groups
      .map(group => group.groupName)
      .reduce((groupMap, groupName) => {
        groupMap[groupName] = false;
        return groupMap;
      }, {});
  }

  render() {
    const { data } = this.props;
    const { groups, additional } = responseToNavigationData(data);
    return (
      <div className="mb-navigation">
        {groups.map((group, i) => (
          <NavigationGroup
            {...group}
            key={group.groupName}
            open={this.state[group.groupName]}
            onToggle={() => {
              const newState = {};
              Object.keys(this.state).forEach(gN => (newState[gN] = false));
              newState[group.groupName] = !this.state[group.groupName];
              this.setState(newState);
            }}
          />
        ))}
        {additional.map(node => (
          <NavigationSingleLink node={node} key={node.fields.slug} />
        ))}
      </div>
    );
  }
}

function responseToNavigationData(data: DataType): NavigationData {
  const orderedNodes = data.allMarkdownRemark.edges
    .map(edge => edge.node)
    .filter(node => node.fields.slug && node.frontmatter.index)
    .sort(
      (a, b) => parseInt(a.frontmatter.index!) - parseInt(b.frontmatter.index!)
    );
  const additional = orderedNodes.filter(node => !node.frontmatter.group);
  const groupMap: { [groupName: string]: Array<Node> } = orderedNodes
    .filter(node => node.frontmatter.group)
    .reduce(
      (groups, node) => {
        const group = node.frontmatter.group as string;
        (groups[group] = groups[group] || []).push(node);
        return groups;
      },
      {} as { [groupName: string]: Array<Node> }
    );
  const orderedGroups = data.site.siteMetadata.navigationGroups;
  const groups = orderedGroups
    .filter(group => groupMap[group])
    .map(group => ({ groupName: group, nodes: groupMap[group] }));
  return { additional, groups };
}

type NavigationData = {
  groups: Array<{
    groupName: string;
    nodes: Array<Node>;
  }>;
  additional: Array<Node>;
};

type DataType = {
  allMarkdownRemark: {
    edges: Array<{
      node: Node;
    }>;
  };
  site: {
    siteMetadata: {
      navigationGroups: Array<string>;
    };
  };
};

export default () => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            navigationGroups
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
    render={(data: DataType) => <Navigation data={data} />}
  />
);
