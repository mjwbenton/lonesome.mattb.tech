import "../src/style/index.css";
import "prismjs/themes/prism-okaidia.css";
import React from "react";
import HtmlHeader from "../src/global/HtmlHeader";
import Logo from "../src/global/Logo";
import { Navigation } from "../src/navigation/Navigation";

export default function MyApp({ Component, pageProps }) {
  const { navigation, ...componentProps } = pageProps;
  return (
    <>
      <HtmlHeader />
      <Logo />
      {navigation ? <Navigation {...navigation} /> : null}
      <main className="m-4 md:m-8">
        <Component {...componentProps} />
      </main>
    </>
  );
}
