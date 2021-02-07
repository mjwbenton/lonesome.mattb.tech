import { Plugin } from "unified";
import { Node } from "unist";
import { Parent, Root, Element } from "hast";
import h from "hastscript";

// TODO: Add some bottom padding

const TYPOGRAPHY_CLASS = "prose";

type Children = Parent["children"];
type Child = Children[0];

function nodeIsRoot(node: Node): node is Root {
  return node.type === "root";
}

function isWrapElement(element: Child | null): element is Element {
  return (
    element?.type == "element" &&
    element?.tagName == "div" &&
    ((element?.properties?.className as string[] | undefined)?.includes(
      TYPOGRAPHY_CLASS
    ) ??
      false)
  );
}

const mdxTailwindTypography: Plugin<[{ additionalClasses?: string }]> = ({
  additionalClasses,
} = {}) => {
  return (tree: Node) => {
    if (!nodeIsRoot(tree)) {
      throw new Error("expecting root node");
    }
    tree.children = tree.children.reduce((result: Children, child: Child) => {
      // Skip over text nodes containing only new lines to avoid them creating empty div tags
      if (child.type === "text" && child.value === "\n") {
        return result;
      }
      if (child.type === "element" || child.type === "text") {
        const lastElement = result.length ? result[result.length - 1] : null;
        if (isWrapElement(lastElement)) {
          lastElement.children.push(child);
        } else {
          result.push(
            h(
              "div",
              {
                role: "presentation",
                class: `${TYPOGRAPHY_CLASS} ${additionalClasses ?? ""}`,
              },
              [child]
            )
          );
        }
      } else {
        result.push(child);
      }
      return result;
    }, []);
  };
};

module.exports = mdxTailwindTypography;
