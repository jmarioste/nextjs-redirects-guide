import React from 'react'
import { GetServerSideProps } from 'next';
import { getSession } from "next-auth/react"
import Link from 'next/link';
const RestrictedPage = () => {
  return (
    <div className='container'>
      <h1 className='text-2xl my-4'>This page is restricted and requires Login.</h1>
      <Link className='btn my-2 btn-accent' href="/"> Back to home</Link>

    </div>
  );
};

export default RestrictedPage;

export const getServerSideProps: GetServerSideProps = async (
  ctx
) => {
  console.log(ctx.req.url)
  const redirectURL = encodeURIComponent(ctx.req.url!);
  const session = await getSession({ req: ctx.req })

  if (!session) {
    return {
      redirect: {
        destination: `/login?redirectUrl=${redirectURL}`,
        permanent: false
      }
    }
  }

  return {
    props: {
    },
  };
};
