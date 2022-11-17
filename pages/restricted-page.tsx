import React from 'react'
import { GetServerSideProps } from 'next';
import { getSession } from "next-auth/react"
const RestrictedPage = () => {
  return (
    <div>
      This page is restricted and requires 2FA.
    </div>
  );
};

export default RestrictedPage;

export const getServerSideProps: GetServerSideProps = async (
  ctx
) => {
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
