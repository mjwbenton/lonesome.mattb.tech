import React from "react";
import styled from "styled-components";
import HtmlHeader from "./HtmlHeader";
import GlobalStyles from "../style/GlobalStyles";
import Logo from "./Logo";
import Navigation from "../navigation/Navigation";
import ApiProvider from "./ApiProvider";

const Content = styled.div`
  margin: 2vw;
`;

const Layout: React.FunctionComponent<{ children: any }> = ({ children }) => (
  <ApiProvider>
    <GlobalStyles />
    <HtmlHeader />
    <Logo />
    <Navigation />
    <Content>{children}</Content>
  </ApiProvider>
);

export default Layout;
