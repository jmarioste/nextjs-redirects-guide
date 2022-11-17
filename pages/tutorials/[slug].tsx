import { getRedirectByPath } from "data/getRedirectByPath";
import { GetStaticPaths, GetStaticProps } from "next";

import React from "react";
import { getPostBySlug as getTutorialBySlug } from "../../data/getPostBySlug";
import { Post as Tutorial } from "../../data/Post";

type TutorialPageProps = {
  tutorial: Tutorial;
};
const TutorialPage = (props: TutorialPageProps) => {
  return (
    <div>
      Tutorials Page
      <h1>{props.tutorial?.slug}</h1>
      <p>{props.tutorial?.content}</p>
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
  // if (redirect) {
  //   return {
  //     redirect: {
  //       destination: redirect.destination,
  //       permanent: redirect.statusCode === 301,
  //       statusCode: redirect.statusCode
  //     }
  //   }
  // }

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
