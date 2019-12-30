import React from "react";
import styled from "styled-components";
import {
  spacingUnit,
  halfSpacingUnit,
  backgroundColor,
  altBackgroundColor
} from "../style/style";

export const StripedList = styled.ul``;

export default StripedList;

const Li = styled.li`
  display: flex;
  list-style-type: none;
  position: relative;
  z-index: 1;
  overflow: hidden;
  padding: ${spacingUnit};

  :nth-child(even) {
    background-color: ${altBackgroundColor};
  }

  * {
    margin-right: ${spacingUnit};
    z-index: 1;
  }
`;

const Index = styled.span`
  font-size: 8rem;
  margin-top: -3rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: right;
  color: ${altBackgroundColor};
  z-index: 0;

  ${Li}:nth-child(even) & {
    color: ${backgroundColor};
  }
`;

export const StripeElement = ({ children, index }) => (
  <Li>
    {children}
    <Index>{index}</Index>
  </Li>
);
