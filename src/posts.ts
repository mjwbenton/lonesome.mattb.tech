import path from "path";
import fs from "fs";
import { promisify } from "util";
import matter from "gray-matter";
import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import globby from "globby";

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const rootPath = path.join(process.cwd(), "content");

interface Post {
  readonly html: string;
  readonly title: string;
  readonly slug: string;
  readonly layout: string | null;
  readonly group: string | null;
  readonly index: number | null;
  readonly data: any;
}

export async function getPost(postPath: string[]): Promise<Post> {
  const rawContent = (await readFile(urlPathToFilePath(postPath))).toString();
  const { content, data } = matter(rawContent);
  const { layout, slug, group, index, title, ...rest } = data;
  const output = String(
    await unified().use(markdown).use(remark2rehype).use(html).process(content)
  );

  return {
    html: output,
    title,
    slug: postPath?.join("/") ?? "",
    layout: layout ?? null,
    group: group ?? null,
    index: index ? parseInt(index) : null,
    data: { ...rest },
  };
}

export async function listAllPosts(): Promise<Array<string[]>> {
  const files = await globby(rootPath, { expandDirectories: true });
  console.log(files);
  return (
    await Promise.all(files.map(async (file) => [filePathToUrlPath(file)]))
  ).flat();
}

export async function getAllPosts(): Promise<Array<Post>> {
  const allPostPaths = await listAllPosts();
  return Promise.all(allPostPaths.map((postPath) => getPost(postPath)));
}

function filePathToUrlPath(filePath: string): string[] {
  const relativePath = path.relative(rootPath, filePath);
  const split = relativePath.split(path.sep);
  const last = split.pop();
  if (last === "index.md") {
    return split;
  }
  return [...split, last!.replace(".md", "")];
}

function urlPathToFilePath(urlPath: string[]): string {
  if (urlPath == null || urlPath.length === 0) {
    return path.join(rootPath, "index.md");
  }
  return path.join(rootPath, ...urlPath).concat(".md");
}
