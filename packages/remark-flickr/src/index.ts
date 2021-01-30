import escape from "escape-html";
import { getPhoto, Photo, PhotoSource } from "@mattb.tech/flickr-api";
import u from "unist-builder";
import visit from "unist-util-visit";
import map from "unist-util-map";
import { Image } from "mdast";
import { Node } from "unist";
import { Plugin } from "unified";

const FLICKR_PROTOCOL = "flickr://";

function isImageNode(node: Node): node is Image {
  return node.type === "image";
}

function isFlickrPhoto(node: Image): boolean {
  return node.url.startsWith(FLICKR_PROTOCOL);
}

function flickrPhotoIdForNode(node: Image): string {
  return node.url.replace(FLICKR_PROTOCOL, "");
}

function generateSrcSet(sources: PhotoSource[]): string {
  return sources
    .map((source: PhotoSource) => [source.url, " ", source.width, "w"].join(""))
    .join(", ");
}

const remarkFlickr: Plugin<[{ sizes?: string }]> = ({ sizes } = {}) => {
  return async (tree: Node) => {
    const flickrImageNodes: Array<Image> = [];
    visit<Image>(tree, "image", (node: Image) => {
      if (isFlickrPhoto(node)) {
        flickrImageNodes.push(node);
      }
    });
    const imageIds = flickrImageNodes.map(flickrPhotoIdForNode);
    const flickrResponses = await Promise.all(
      imageIds.map((imageId) => getPhoto(process.env.FLICKR_API_KEY!, imageId))
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
        return u(
          "html",
          `<img ${srcAttr} ${srcsetAttr} ${altAttr} ${sizesAttr} />`
        );
      }
      return node;
    });
  };
};

module.exports = remarkFlickr;
