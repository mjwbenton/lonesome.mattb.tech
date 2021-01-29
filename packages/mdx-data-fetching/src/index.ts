import u from "unist-builder";
//const visit = require("unist-util-visit");

//const LAYOUT_KEY = "layout";

module.exports = () => {
  return (tree) => {
    /*const frontmatter = file.data?.frontmatter ?? {};
    const nodes = Object.keys(frontmatter).flatMap((key) => {
      if (key === LAYOUT_KEY) {
        return [
          u("import", `import layout from "${frontmatter[key]}"`),
          u("export", "export default layout"),
        ];
      } else {
        return [u("export", `export const ${key} = "${frontmatter[key]}"`)];
      }
    });*/
    const getStaticPropsNode = u(
      "export",
      `export { getStaticProps } from "src/global/getStaticProps"`
    );
    tree.children = [getStaticPropsNode, ...tree.children];
  };
};
