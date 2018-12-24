import React from "react";
import HtmlHeader from "./HtmlHeader";
import LeftSide from "./LeftSide";

const Layout: React.FunctionComponent<{ children: any }> = ({ children }) => (
  <div className="mb-body">
    <HtmlHeader />
    <LeftSide />
    <div className="mb-rightside">{children}</div>
  </div>
);

export default Layout;
