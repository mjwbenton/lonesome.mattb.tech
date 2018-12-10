module.exports = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    let slug =
      "/" +
      (fileNode.relativePath as string)
        .replace(".md", ".html")
        .replace("index.html", "");
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};
