import React from "react";
import HtmlHeader from "./HtmlHeader";
import Logo from "./Logo";
import Navigation from "../navigation/Navigation";
import ApiProvider from "./ApiProvider";

const Layout: React.FunctionComponent<{ children: any }> = ({ children }) => (
  <ApiProvider>
    <HtmlHeader />
    <Logo />
    <Navigation />
    <main className="m-4 md:m-8">{children}</main>
  </ApiProvider>
);

export default Layout;
