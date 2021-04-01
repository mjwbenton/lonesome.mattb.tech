import { Plugin } from "unified";
import u from "unist-builder";

const DATA_PROVIDERS = "dataProviders";

const mdxDataFetching: Plugin<
  [
    {
      globalDataProviders?: string[];
      contextBuilder?: string;
      afterRun?: string;
    }
  ]
> = ({ globalDataProviders = [], contextBuilder, afterRun }) => {
  return (tree, file) => {
    const pageMeta = (file.data as any)?.pageMeta ?? {};
    const dataProviders = [
      ...globalDataProviders,
      ...(pageMeta[DATA_PROVIDERS] ?? []),
    ];

    if (dataProviders.length === 0) {
      return;
    }

    const importNodes = [
      ...(contextBuilder
        ? [u("import", `import contextBuild from "${contextBuilder}"`)]
        : []),
      ...(afterRun ? [u("import", `import afterRun from "${afterRun}"`)] : []),
      ...dataProviders.flatMap((provider, i) =>
        u("import", `import _dp${i} from "${provider}"`)
      ),
    ];

    const getStaticPropsNode = u(
      "export",
      `export const getStaticProps = async () => {
        const pageMeta = ${JSON.stringify(pageMeta)};
        const context = contextBuild(pageMeta);
        return afterRun({
          props: {
            ${dataProviders
              .map((_, i) => `...(await _dp${i}(pageMeta, context)),`)
              .join("\n")}
          }
        }, context);
      }`
    );

    tree.children = [
      ...importNodes,
      getStaticPropsNode,
      ...(tree.children as Array<unknown>),
    ];
  };
};

module.exports = mdxDataFetching;
