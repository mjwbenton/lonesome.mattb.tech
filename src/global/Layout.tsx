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
    <div className="m-4 md:m-8">{children}</div>
  </ApiProvider>
);

export default Layout;
