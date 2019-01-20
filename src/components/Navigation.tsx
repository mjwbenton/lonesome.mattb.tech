import * as React from "react";
import { graphql, StaticQuery } from "gatsby";

const Navigation: React.FunctionComponent<{
  data: DataType;
}> = ({ data }) => {
  const groupedNode: {
    [group: string]: Array<Node>;
  } = data.allMarkdownRemark.edges
    .map(edge => edge.node)
    .filter(node => node.fields.slug && node.frontmatter.index)
    .sort(
      (a, b) => parseInt(a.frontmatter.index!) - parseInt(b.frontmatter.index!)
    )
    .reduce((grouping, node) => {
      const group = node.frontmatter.group || "Other";
      (grouping[group] = grouping[group] || []).push(node);
      return grouping;
    }, {});
  const groups = data.site.siteMetadata.navigationGroups;
  return (
    <div className="mb-navigation">
      {groups.map((group, i) => (
        <div className="mb-navigation__section">
          <input
            className="mb-navigation__checkbox"
            type="checkbox"
            id={`mbNavigationCheckbox${i}`}
          />
          <label
            className="mb-navigation__label"
            htmlFor={`mbNavigationCheckbox${i}`}
          >
            {group}
          </label>
          <ul className="mb-navigation__list">
            {groupedNode[group].map((node: Node) => (
              <li key={node.fields.slug} className="mb-navigation__item">
                <a href={node.fields.slug} className="mb-navigation__link">
                  {node.frontmatter.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
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
