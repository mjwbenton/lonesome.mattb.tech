import React from "react";
import styled from "styled-components";
import { spacingUnit, fontColor } from "../style";

const LogoStyle = styled.a`
  display: block;
  margin-bottom: ${spacingUnit};
  margin-top: ${spacingUnit};
  color: ${fontColor};
  font-family: "fira-sans-2", Arial, sans-serif;
  font-size: 2.75rem;
  font-style: italic;
  text-decoration: underline;
  text-align: center;
`;

export default () => <LogoStyle href="/">mattb</LogoStyle>;
