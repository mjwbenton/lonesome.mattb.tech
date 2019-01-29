import React from "react";
import { Node } from "./Node";
import { Link } from "gatsby";

const NavigationGroup: React.FunctionComponent<{
  groupName: string;
  nodes: Array<Node>;
  open: boolean;
  onToggle: () => void;
}> = ({ groupName, nodes, open, onToggle }) => (
  <div key={groupName} className="mb-navigation__section">
    <input
      className="mb-navigation__checkbox"
      type="checkbox"
      id={`mbNavigationCheckbox${groupName}`}
      {...open && { checked: true }}
      onChange={onToggle}
    />
    <label
      className="mb-navigation__label"
      htmlFor={`mbNavigationCheckbox${groupName}`}
    >
      {groupName}
    </label>
    <ul className="mb-navigation__list">
      {nodes.map((node: Node) => (
        <li key={node.fields.slug} className="mb-navigation__item">
          <Link to={node.fields.slug!} className="mb-navigation__link">
            {node.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
export default NavigationGroup;
