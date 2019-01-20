import * as React from "react";
import { graphql, StaticQuery } from "gatsby";

const Navigation: React.FunctionComponent<{
  data: DataType;
}> = ({ data }) => {
  const { groups, additional }: NavigationData = data.allMarkdownRemark.edges
    .map(edge => edge.node)
    .filter(node => node.fields.slug && node.frontmatter.index)
    .sort(
      (a, b) => parseInt(a.frontmatter.index!) - parseInt(b.frontmatter.index!)
    )
    .reduce(
      ({ groups, additional }, node) => {
        const group = node.frontmatter.group;
        if (group) {
          (groups[group] = groups[group] || []).push(node);
        } else {
          additional.push(node);
        }
        return { groups, additional };
      },
      { groups: {}, additional: [] } as NavigationData
    );
  const orderedGroups = data.site.siteMetadata.navigationGroups;
  return (
    <div className="mb-navigation">
      {orderedGroups.map((group, i) => (
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
            {groups[group]
              ? groups[group].map((node: Node) => (
                  <li key={node.fields.slug} className="mb-navigation__item">
                    <a href={node.fields.slug} className="mb-navigation__link">
                      {node.frontmatter.title}
                    </a>
                  </li>
                ))
              : null}
          </ul>
        </div>
      ))}
      {additional.map(node => (
        <div className="mb-navigation__section">
          <a href={node.fields.slug} className="mb-navigation__label">
            {node.frontmatter.title}
          </a>
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

type NavigationData = {
  groups: {
    [group: string]: Array<Node>;
  };
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
