import { Visitor, NodePath } from "@babel/traverse";
import { ObjectProperty, isIdentifier } from "@babel/types";

const GET_STATIC_PROPS = "getStaticProps";
const LAYOUT_PROPS = "layoutProps";

const plugin: () => { visitor: Visitor } = () => {
  return {
    visitor: {
      ObjectProperty(path: NodePath<ObjectProperty>) {
        const propertyIsGetStaticProps =
          isIdentifier(path.node.value) &&
          path.node.value.name === GET_STATIC_PROPS;
        const objectIsLayoutProps = path.findParent((parent: NodePath) => {
          if (parent.isVariableDeclarator()) {
            return (
              isIdentifier(parent.node.id) &&
              parent.node.id.name === LAYOUT_PROPS
            );
          }
          return false;
        });
        if (propertyIsGetStaticProps && objectIsLayoutProps) {
          path.remove();
        }
      },
    },
  };
};

module.exports = plugin;
