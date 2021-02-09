import "../src/style/index.css";
import "prismjs/themes/prism-okaidia.css";
import React from "react";
import HtmlHeader from "../src/global/HtmlHeader";
import Logo from "../src/global/Logo";
import { Navigation } from "../src/navigation/Navigation";
import ApiProvider from "../src/global/ApiProvider";
import { PageDataProvider } from "global/pageData";
import { ThemeProvider } from "next-themes";
import ThemeChanger from "global/ThemeChanger";

export default function MyApp({ Component, pageProps }) {
  const { navigation, ...componentProps } = pageProps;
  return (
    <ApiProvider>
      <HtmlHeader />
      <ThemeProvider attribute="class">
        <div role="presentation" className="flex">
          <Logo />
          <ThemeChanger />
        </div>
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
