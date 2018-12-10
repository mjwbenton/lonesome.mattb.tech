import path from "path";

type GatsbyCreatePageParams = {
  actions: ActionsType;
  graphql: GraphqlType;
};

interface ActionsType {
  createPage(page: { path: string; component: string; context: {} }): void;
}

type GraphqlType = (query: string) => Promise<any>;

type ResultType = {
  errors: any;
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          fields?: {
            slug?: string;
          };
          frontmatter?: {
            layout?: string;
          };
        };
      }>;
    };
  };
};

module.exports = async ({ actions, graphql }: GatsbyCreatePageParams) => {
  const { createPage } = actions;
  const MarkdownPage = path.resolve(`src/components/MarkdownPage.tsx`);

  const result: ResultType = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              layout
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (!node.fields || !node.fields.slug) {
      return;
    }

    let Layout = MarkdownPage;
    if (node.frontmatter && node.frontmatter.layout) {
      Layout = path.resolve(`src/components/${node.frontmatter.layout}.tsx`);
    }

    createPage({
      path: node.fields.slug,
      component: Layout,
      context: {}
    });
  });
};
