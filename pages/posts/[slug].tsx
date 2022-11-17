import React from 'react'
import { Post } from 'data/Post';
import { getPostBySlug } from 'data/getPostBySlug';
import { GetServerSideProps } from 'next';
import { getRedirectByPath } from 'data/getRedirectByPath';

type PostPageProps = {
  post: Post;
};

const PostPage = (props: PostPageProps) => {
  return (
    <div>
      Post Detail Page
      <h1>{props.post?.slug}</h1>
      <p>{props.post?.content}</p>
    </div>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (
  ctx
) => {
  const slug = ctx.params?.slug as string;
  const path = ctx.req.url as string;
  //check redirect
  const redirect = getRedirectByPath(path)
  if (redirect) {
    return {
      redirect: {
        destination: redirect.destination,
        permanent: redirect.statusCode === 301,
        statusCode: redirect.statusCode
      }
    }
  }

  const post = getPostBySlug(slug) ?? null;

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
