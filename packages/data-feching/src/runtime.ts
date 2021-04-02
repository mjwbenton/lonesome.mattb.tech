import { getClient } from "./client";

export interface DataProvider<PageMeta = unknown, Result = any> {
  (
    pageMeta: PageMeta,
    context: { client: ReturnType<typeof getClient> }
  ): Promise<Result>;
}

export default async function runtime(
  pageMeta: unknown,
  dataProviders: Array<DataProvider>
) {
  const context = { client: getClient() };
  const results = await Promise.all(
    dataProviders.map((dp) => dp(pageMeta, context))
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
