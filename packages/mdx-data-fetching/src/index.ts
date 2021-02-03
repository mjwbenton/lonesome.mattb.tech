import { Plugin } from "unified";
import u from "unist-builder";

const PROPS_PROVIDERS = "propsProviders";

const mdxDataFetching: Plugin<
  [{ basePath?: string; globalPropsProviders?: string[] }]
> = ({ basePath = "", globalPropsProviders = [] }) => {
  return (tree, file) => {
    const frontmatter = (file.data as any)?.frontmatter ?? {};
    const frontmatterPropsProviders: Array<string> =
      frontmatter[PROPS_PROVIDERS] ?? [];
    const propsProviders = [
      ...globalPropsProviders,
      ...frontmatterPropsProviders,
    ];

    if (propsProviders.length === 0) {
      return;
    }

    const importNodes = propsProviders.flatMap((provider, i) => {
      return u("import", `import p${i} from "${basePath}${provider}"`);
    });

    const exportFrontmatterNode = u(
      "export",
      `export const frontmatter = ${JSON.stringify(frontmatter)}`
    );

    const calls = propsProviders
      .map((_, i) => {
        return `...(await p${i}(frontmatter)),`;
      })
      .join("\n");

    const getStaticPropsNode = u(
      "export",
      `export const getStaticProps = async () => {
        return {
          props: {
            ${calls}
          }
        }
        return globalGetStaticProps()
      }`
    );

    tree.children = [
      ...importNodes,
      exportFrontmatterNode,
      getStaticPropsNode,
      ...(tree.children as Array<unknown>),
    ];
  };
};

module.exports = mdxDataFetching;
