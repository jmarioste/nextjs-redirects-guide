import React from 'react'
import { Post } from 'data/Post';
import { getPostBySlug } from 'data/getPostBySlug';
import { GetServerSideProps } from 'next';
import { getRedirectByPath } from 'data/getRedirectByPath';
import Link from 'next/link';

type PostPageProps = {
  post: Post;
};

const PostPage = (props: PostPageProps) => {
  return (
    <div className='container'>
      <h1 className='text-2xl my-4'>Post Detail Page</h1>
      <h1>Slug: {props.post?.slug}</h1>
      <p>Content: {props.post?.content}</p>

      <Link className='btn my-2 btn-accent' href="/"> Back to home</Link>
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
