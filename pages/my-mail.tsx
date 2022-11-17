
import { GetStaticProps } from 'next';
import React from 'react'

const SampleRedirect = () => {
  return (
    null
  )
}

export default SampleRedirect

export const getStaticProps: GetStaticProps = async (ctx) => {

  return {
    redirect: {
      destination: "https://mail.google.com/mail/u/0/",
      permanent: false
    }
  };
};
