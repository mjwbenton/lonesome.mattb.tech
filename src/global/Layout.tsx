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
    <div className="container px-4 mx-auto my-4">{children}</div>
  </ApiProvider>
);

export default Layout;
