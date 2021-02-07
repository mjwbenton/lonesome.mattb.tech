import path from "path";
import fs from "fs";
import { promisify } from "util";
import matter from "gray-matter";
import globby from "globby";

const readFile = promisify(fs.readFile);

const rootPath = path.join(process.cwd(), "pages");

interface PageMeta {
  readonly title: string;
  readonly slug: string;
  readonly layout: string | null;
  readonly group: string | null;
  readonly index: number | null;
  readonly data: any;
}

export async function getPageMeta(pagePath: string): Promise<PageMeta> {
  const rawContent = (await readFile(path.join(rootPath, pagePath))).toString();
  const { data } = matter(rawContent);
  const { layout, slug, group, index, title, ...rest } = data;

  return {
    title,
    slug: pagePath.replace(".mdx", "").replace("index", ""),
    layout: layout ?? null,
    group: group ?? null,
    index: index ? parseInt(index) : null,
    data: { ...rest },
  };
}

export async function listAllPages(): Promise<Array<string>> {
  return (await globby(rootPath, { expandDirectories: true })).map((page) =>
    "/".concat(path.relative(rootPath, page))
  );
}

export async function getAllPageMeta(): Promise<Array<PageMeta>> {
  const allPages = await listAllPages();
  return Promise.all(allPages.map((page) => getPageMeta(page)));
}
