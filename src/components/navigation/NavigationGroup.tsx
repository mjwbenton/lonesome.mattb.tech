import React from "react";
import styled, { keyframes, css } from "styled-components";
import { spacingUnit, fontColor } from "../../style";
import { Node } from "./Node";
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
  ${p =>
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
  color: #3c3c3c;
`;

const NavigationGroup: React.FunctionComponent<{
  groupName: string;
  nodes: Array<Node>;
  open: boolean;
  onToggle: () => void;
}> = ({ groupName, nodes, open, onToggle }) => (
  <div>
    <NavigationHead onClick={onToggle}>{groupName}</NavigationHead>
    <List open={open}>
      {nodes.map((node: Node) => (
        <Item key={node.fields.slug}>
          <NavLink to={node.fields.slug!}>{node.frontmatter.title}</NavLink>
        </Item>
      ))}
    </List>
  </div>
);

export default NavigationGroup;
