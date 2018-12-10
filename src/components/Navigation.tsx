import * as React from "react";
import HamburgerIcon from "./HamburgerIcon";
import { graphql, StaticQuery } from "gatsby";

const Navigation: React.FunctionComponent<{
  data: DataType;
}> = ({ data }) => {
  const groupedNode: {
    [group: string]: Array<Node>;
  } = data.allMarkdownRemark.edges
    .map(edge => edge.node)
    .filter(node => node.fields.slug && node.frontmatter.index)
    .reduce((grouping, node) => {
      const groupNumber = node.frontmatter.group || "0";
      (grouping[groupNumber] = grouping[groupNumber] || []).push(node);
      return grouping;
    }, {});
  const groups = Object.keys(groupedNode).sort();
  return (
    <div className="mb-navigation">
      <input
        className="mb-navigation__expander-checkbox"
        type="checkbox"
        id="navigationExpander"
      />
      <label
        className="mb-navigation__expander-label"
        htmlFor="navigationExpander"
      >
        <HamburgerIcon />
      </label>
      <div className="mb-navigation__container">
        {groups.map((group, i) => (
          <ul key={i} className="mb-navigation__group">
            {groupedNode[group].map((node: Node) => (
              <li key={node.fields.slug} className="mb-navigation__item">
                <a href={node.fields.slug} className="mb-navigation__link">
                  {node.frontmatter.title}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

type Node = {
  fields: {
    slug?: string;
  };
  frontmatter: {
    title?: string;
    index?: string;
    group?: string;
  };
};

type DataType = {
  allMarkdownRemark: {
    edges: Array<{
      node: Node;
    }>;
  };
};

export default () => (
  <StaticQuery
    query={graphql`
      {
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
