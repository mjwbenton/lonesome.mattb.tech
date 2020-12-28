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
    <div className="m-8">{children}</div>
    <link rel="stylesheet" href="https://use.typekit.net/ukk8ctr.css" />
  </ApiProvider>
);

export default Layout;
