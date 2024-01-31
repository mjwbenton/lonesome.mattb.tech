import { Plugin } from "unified";
import { u } from "unist-builder";
import { parse } from "acorn";

const DATA_PROVIDERS = "dataProviders";

const plugin: Plugin<
  [
    {
      globalDataProviders?: string[];
    }
  ]
> = ({ globalDataProviders = [] } = {}) => {
  return (tree, file) => {
    const pageMeta = (file.data as any)?.pageMeta ?? {};
    const dataProviders = [
      ...globalDataProviders,
      ...(pageMeta[DATA_PROVIDERS] ?? []),
    ];

    const runtimeImport = `import { runtime } from "@mattb.tech/data-fetching"`;
    const importRuntimeNode = u(
      "mdxjsEsm",
      {
        data: {
          estree: parse(runtimeImport, {
            ecmaVersion: "latest",
            sourceType: "module",
          }),
        },
      },
      runtimeImport
    );

    const importDataProviderNodes = dataProviders.flatMap((provider, i) => {
      const importStr = `import _dp${i} from "${provider}"`;
      return u(
        "mdxjsEsm",
        {
          data: {
            estree: parse(importStr, {
              ecmaVersion: "latest",
              sourceType: "module",
            }),
          },
        },
        importStr
      );
    });

    const getStaticPropsExport = `export const getStaticProps = async () => {
        const pageMeta = ${JSON.stringify(pageMeta)};
        return await runtime(pageMeta, [${dataProviders
          .map((_, i) => `_dp${i}`)
          .join(", ")}])
      }`;
    const getStaticPropsNode = u(
      "mdxjsEsm",
      {
        data: {
          estree: parse(getStaticPropsExport, {
            ecmaVersion: "latest",
            sourceType: "module",
          }),
        },
      },
      getStaticPropsExport
    );

    (tree as any).children = [
      importRuntimeNode,
      ...importDataProviderNodes,
      getStaticPropsNode,
      ...(tree as any).children,
    ];
  };
};

export default plugin;
