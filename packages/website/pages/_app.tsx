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
  const { navigation, frontmatter, ...componentProps } = pageProps;
  const title = frontmatter?.title
    ? `${frontmatter!.title} - lonesome.mattb.tech`
    : "lonesome.mattb.tech";
  return (
    <ApiProvider>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider attribute="class">
        <header>
          <div role="presentation" className="flex">
            <Logo />
            <ThemeChanger />
          </div>
          {navigation ? <Navigation {...navigation} /> : null}
        </header>
        <main className="m-4 md:m-8">
          <PageDataProvider value={componentProps}>
            <Component {...componentProps} />
          </PageDataProvider>
        </main>
      </ThemeProvider>
    </ApiProvider>
  );
}
