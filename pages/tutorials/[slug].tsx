import { getRedirectByPath } from "data/getRedirectByPath";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

import React from "react";
import { getPostBySlug as getTutorialBySlug } from "../../data/getPostBySlug";
import { Post as Tutorial } from "../../data/Post";

type TutorialPageProps = {
  tutorial: Tutorial;
};
const TutorialPage = (props: TutorialPageProps) => {
  return (
    <div className='container'>
      <h1 className='text-2xl my-4'>Tutorials Page</h1>
      <h1>Slug: {props.tutorial?.slug}</h1>
      <p>Content: {props.tutorial?.content}</p>
      <Link className='btn my-2 btn-accent' href="/"> Back to home</Link>
    </div>
  );
};

export default TutorialPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps<TutorialPageProps> = async (ctx) => {
  const slug = ctx.params?.slug as string;
  const tutorial = getTutorialBySlug(slug) ?? null;
  const path = `/tutorials/${slug}`;
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

  if (!tutorial) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tutorial: tutorial,
    },
    revalidate: 300
  };
};
