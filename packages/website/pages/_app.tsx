import "../src/style/index.css";
import "prismjs/themes/prism-okaidia.css";
import React from "react";
import Head from "next/head";
import Logo from "../src/global/Logo";
import Navigation from "global/Navigation";
import { DataFetchingProvider } from "@mattb.tech/data-fetching";
import { ThemeProvider } from "next-themes";
import ThemeChanger from "global/ThemeChanger";
import { PageMeta } from "pageMeta";
import { Provider as ReakitProvider } from "reakit";

export default function MyApp({ Component, pageProps }) {
  const {
    pageMeta,
  }: {
    pageMeta?: PageMeta;
  } = pageProps;
  const title = pageMeta?.title
    ? `${pageMeta.title} - lonesome media`
    : "lonesome media";
  return (
    <>
      <Head>
        <title>{title}</title>
        {pageMeta?.description ? (
          <meta name="description" content={pageMeta.description} />
        ) : null}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <ReakitProvider>
        <ThemeProvider attribute="class">
          <header className="flex relative">
            <Logo />
            <ThemeChanger />
          </header>
          <Navigation />
          <main className="prose dark:prose-invert m-4 md:m-8">
            <DataFetchingProvider pageProps={pageProps}>
              <Component />
            </DataFetchingProvider>
          </main>
        </ThemeProvider>
      </ReakitProvider>
    </>
  );
}
