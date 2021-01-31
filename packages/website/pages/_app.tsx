import "../src/style/index.css";
import "prismjs/themes/prism-okaidia.css";
import React from "react";
import HtmlHeader from "../src/global/HtmlHeader";
import Logo from "../src/global/Logo";
import { Navigation } from "../src/navigation/Navigation";
import ApiProvider from "../src/global/ApiProvider";

export default function MyApp({ Component, pageProps }) {
  const { navigation, ...componentProps } = pageProps;
  return (
    <ApiProvider>
      <HtmlHeader />
      <Logo />
      {navigation ? <Navigation {...navigation} /> : null}
      <main className="m-4 md:m-8 prose">
        <Component {...componentProps} />
      </main>
    </ApiProvider>
  );
}
