import React from "react";
import styled from "styled-components";
import HtmlHeader from "./HtmlHeader";
import GlobalStyles from "./GlobalStyles";
import Logo from "./Logo";
import Navigation from "./navigation/Navigation";

const Content = styled.div`
  margin: 2vw;
`;

const Layout: React.FunctionComponent<{ children: any }> = ({ children }) => (
  <div>
    <GlobalStyles />
    <HtmlHeader />
    <Logo />
    <Navigation />
    <Content>{children}</Content>
  </div>
);

export default Layout;
