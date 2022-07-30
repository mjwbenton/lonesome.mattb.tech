import escape from "escape-html";
import { u } from "unist-builder";
import fetch from "node-fetch";
import { visit } from "unist-util-visit";
import { map } from "unist-util-map";
import { Image } from "mdast";
import { Node } from "unist";
import { Plugin } from "unified";

const FLICKR_PROTOCOL = "flickr://";

const GRAPHQL_ENDPOINT = "https://api.mattb.tech";

const QUERY = `
  query RemarkFlickr($photoId: ID!) {
    photo(photoId: $photoId) {
      id
      title
      mainSource {
        url
      }
      sources {
        url
        width
      }
    }
  }
`;

interface Photo {
  id: string;
  title: string;
  mainSource: {
    url: string;
  };
  sources: {
    url: string;
    width: number;
  }[];
}

function isImageNode(node: Node): node is Image {
  return node.type === "image";
}

function isFlickrPhoto(node: Image): boolean {
  return node.url.startsWith(FLICKR_PROTOCOL);
}

function flickrPhotoIdForNode(node: Image): string {
  return node.url.replace(FLICKR_PROTOCOL, "");
}

function generateSrcSet(sources: { url: string; width: number }[]): string {
  return sources
    .map((source) => [source.url, " ", source.width, "w"].join(""))
    .join(", ");
}

async function getPhoto(photoId: string) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      query: QUERY,
      variables: {
        photoId,
      },
    }),
    headers: { "Content-Type": "application/json" },
  });
  const result = (await response.json()) as any;
  if (result.errors) {
    throw new Error(`GraphQL error fetching photoId "${photoId}"`);
  }
  return result.data.photo;
}

export const plugin: Plugin<[{ sizes?: string }]> = ({ sizes } = {}) => {
  return async (tree: Node) => {
    const flickrImageNodes: Array<Image> = [];
    visit(tree, "image", (node: Image) => {
      if (isFlickrPhoto(node)) {
        flickrImageNodes.push(node);
      }
    });
    const imageIds = flickrImageNodes.map(flickrPhotoIdForNode);
    const flickrResponses = await Promise.all(
      imageIds.map((imageId) => getPhoto(imageId))
    );
    const responsesById = flickrResponses.reduce<{ [imageId: string]: Photo }>(
      (acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      },
      {}
    );
    return map(tree, (node: Node) => {
      if (isImageNode(node) && isFlickrPhoto(node)) {
        const imageId = flickrPhotoIdForNode(node);
        const response = responsesById[imageId]!;
        const srcAttr = `src="${response.mainSource.url}"`;
        const srcsetAttr = `srcset="${generateSrcSet(response.sources)}"`;
        const altAttr = `alt="${escape(node.alt || response.title)}"`;
        const sizesAttr = sizes ? `sizes="${sizes}"` : "";
        const imgHtml = `<img ${srcAttr} ${srcsetAttr} ${altAttr} ${sizesAttr} />`;
        if (node.title) {
          return u(
            "html",
            `<figure>${imgHtml}<figcaption>${node.title}</figcaption></figure>`
          );
        } else {
          return u("html", imgHtml);
        }
      }
      return node;
    });
  };
};
