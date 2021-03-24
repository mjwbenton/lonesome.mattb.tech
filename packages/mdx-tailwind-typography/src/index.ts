import { Plugin } from "unified";
import h from "hastscript";

/*
 * We want to use tailwind typographies "prose" class such that our markdown is nicely formatted
 * for us with minimal effort. However, we also want the ability for bits of JSX to break-out of that
 * formatting so that they don't have to override the CSS provided by tailwind typography. This solves
 * for that by ensuring that any JSX element in the root is not wrapped in the prose class.
 * Every other element is wrapped in a `div` with the prose class.
 */

const TYPOGRAPHY_CLASS = "prose";

type NodeType<TypeValue> = {
  type: TypeValue;
  value: string;
};

type NodeWithChildren<TypeValue> = {
  type: TypeValue;
  children: Array<Node>;
};

type Element = NodeWithChildren<"element"> & {
  tagName: string;
  properties?: any;
};

type Node =
  | NodeWithChildren<"root">
  | Element
  | NodeType<"text">
  | NodeType<"jsx">
  | NodeType<string>;

function nodeIsRoot(node: any): node is NodeWithChildren<"root"> {
  return node.type === "root";
}

function isEmptyNode(node: Node): node is NodeType<"text"> {
  return node.type === "text" && node.value === "\n";
}

function isTypographyWrapElement(element: any): element is Element {
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
  return (tree: unknown) => {
    if (!nodeIsRoot(tree)) {
      throw new Error("expecting root node");
    }
    tree.children = tree.children.reduce(
      (result: Array<Node>, child: Node, index: number, array: Array<Node>) => {
        // Ignore types that don't result directly in output entirely
        if (
          child.type !== "jsx" &&
          child.type !== "text" &&
          child.type !== "element"
        ) {
          result.push(child);
          return result;
        }

        // Skip empty elements
        if (isEmptyNode(child)) {
          return result;
        }

        // If we encounter a JSX element in the root then don't wrap it
        if (child.type === "jsx") {
          result.push(child);
          return result;
        }

        // Otherwise we need to wrap in typography
        const lastElement = result.length ? result[result.length - 1] : null;
        // if the previous element was a typography wrap element just add it
        if (isTypographyWrapElement(lastElement)) {
          lastElement.children.push(child);
        } else {
          // otherwise we need a new wrap element
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

        return result;
      },
      []
    );
  };
};

module.exports = mdxTailwindTypography;
