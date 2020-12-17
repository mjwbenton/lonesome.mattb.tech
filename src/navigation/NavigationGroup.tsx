import React from "react";
import styled, { keyframes, css } from "styled-components";
import { spacingUnit, fontColor } from "../style/style";
import { Entry, Group } from "./navigationTypes";
import { Link } from "gatsby";
import NavigationHead from "./NavigationHead";

const expandAnimation = keyframes`
  from {
    max-height: 0;
  }
  to {
    max-height: 1000px;
  }
`;

const List = styled("ul")<{ open: boolean }>`
  overflow: hidden;
  ${(p) =>
    p.open
      ? css`
          animation: ${expandAnimation} 1s linear;
        `
      : css`
          max-height: 0px;
        `}
`;

const Item = styled.li`
  list-style-type: none;
  padding-bottom: ${spacingUnit};
`;

const NavLink = styled(Link)`
  font-style: italic;
  color: ${fontColor};
  text-decoration: none;
  :visited {
    color: ${fontColor};
  }
`;

const NavigationGroup: React.FunctionComponent<
  Group & {
    open: boolean;
    onToggle: () => void;
  }
> = ({ title, entries, open, onToggle }) => (
  <div>
    <NavigationHead onClick={onToggle}>{title}</NavigationHead>
    <List open={open}>
      {entries.map((entry: Entry) => (
        <Item key={entry.slug}>
          <NavLink to={entry.slug}>{entry.title}</NavLink>
        </Item>
      ))}
    </List>
  </div>
);

export default NavigationGroup;
