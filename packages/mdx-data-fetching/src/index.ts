import { Plugin } from "unified";
import u from "unist-builder";

const DATA_PROVIDERS = "dataProviders";

const mdxDataFetching: Plugin<
  [{ basePath?: string; globalDataProviders?: string[] }]
> = ({ basePath = "", globalDataProviders = [] }) => {
  return (tree, file) => {
    const frontmatter = (file.data as any)?.frontmatter ?? {};
    const frontmatterDataProviders: Array<string> =
      frontmatter[DATA_PROVIDERS] ?? [];
    const dataProviders = [...globalDataProviders, ...frontmatterDataProviders];

    if (dataProviders.length === 0) {
      return;
    }

    const importNodes = dataProviders.flatMap((provider, i) => {
      return u("import", `import _dp${i} from "${basePath}${provider}"`);
    });

    const exportFrontmatterNode = u(
      "export",
      `export const frontmatter = ${JSON.stringify(frontmatter)}`
    );

    const calls = dataProviders
      .map((_, i) => {
        return `...(await _dp${i}(frontmatter)),`;
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
