import React from "react";
import styled from "styled-components";
import { altBackgroundColor, halfSpacingUnit } from "../style/style";

const Wrapper = styled.div`
  background-color: ${altBackgroundColor};
  display: flex;
  padding: ${halfSpacingUnit};
  width: 100%;
  font-size: 0.75rem;
`;

const Left = styled.div`
  display: inline;
  flex: 1;
`;

const Link = styled.a`
  :after {
    content: "→";
  }
`;

export default ({ externalLinkUrl, externalLinkText, children }) => (
  <Wrapper>
    <Left>{children}</Left>
    <Link href={externalLinkUrl}>{externalLinkText}</Link>
  </Wrapper>
);
