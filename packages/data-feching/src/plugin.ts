import { Plugin } from "unified";
import { u } from "unist-builder";

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

    const importRuntimeNode = u(
      "import",
      `import { runtime } from "@mattb.tech/data-fetching"`
    );

    const importDataProviderNodes = dataProviders.flatMap((provider, i) =>
      u("import", `import _dp${i} from "${provider}"`)
    );

    const getStaticPropsNode = u(
      "export",
      `export const getStaticProps = async () => {
        const pageMeta = ${JSON.stringify(pageMeta)};
        return await runtime(pageMeta, [${dataProviders
          .map((_, i) => `_dp${i}`)
          .join(", ")}])
      }`
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
