import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getPost, listAllPostPaths } from "../src/posts";
import withGlobalProps from "../src/global/withGlobalProps";

export default function Page({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      post: await getPost(context.params.slug),
      ...(await withGlobalProps(context)),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await listAllPostPaths();
  return {
    paths: posts.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};
