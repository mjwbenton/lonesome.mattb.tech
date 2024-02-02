import { getClient } from "./client.js";
import { ApolloClient } from "@apollo/client/core/index.js";
import { NormalizedCacheObject } from "@apollo/client/cache/inmemory/types.js";

export interface DataProvider<PageMeta = unknown, Result = any> {
  (
    pageMeta: PageMeta,
    context: { client: ApolloClient<NormalizedCacheObject> },
  ): Promise<Result>;
}

export default async function runtime(
  pageMeta: unknown,
  dataProviders: Array<DataProvider>,
) {
  const context = { client: getClient() };
  const results = await Promise.all(
    dataProviders.map((dp) => dp(pageMeta, context)),
  );
  const props = results.reduce((acc, cur) => Object.assign(acc, cur ?? {}), {});
  return {
    props: {
      ...props,
      apolloCache: context.client.extract(),
      pageMeta,
    },
  };
}
