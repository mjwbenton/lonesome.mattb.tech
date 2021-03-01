import "../src/style/index.css";
import "prismjs/themes/prism-okaidia.css";
import React from "react";
import Head from "next/head";
import Logo from "../src/global/Logo";
import { Navigation } from "../src/navigation/Navigation";
import ApiProvider from "../src/global/ApiProvider";
import { PageDataProvider } from "global/pageData";
import { ThemeProvider } from "next-themes";
import ThemeChanger from "global/ThemeChanger";

export default function MyApp({ Component, pageProps }) {
  const { navigation, pageMeta, ...componentProps } = pageProps;
  return (
    <ApiProvider>
      <Head>
        <title>{pageMeta.title} - lonesome media</title>
        <meta name="description" content={pageMeta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class">
        <header className="flex relative">
          <Logo />
          <ThemeChanger />
        </header>
        {navigation ? <Navigation {...navigation} /> : null}
        <main className="m-4 md:m-8">
          <PageDataProvider value={componentProps}>
            <Component {...componentProps} />
          </PageDataProvider>
        </main>
      </ThemeProvider>
    </ApiProvider>
  );
}
