import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import withGlobalProps from "../src/global/withGlobalProps";
import { getPost, listAllPosts } from "../src/posts";

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
  const posts = await listAllPosts();
  return {
    paths: posts.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};
