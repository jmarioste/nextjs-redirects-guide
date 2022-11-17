import { getAllRedirects } from "data/getRedirectByPath";
import { RedirectItem } from "data/RedirectItem";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

type Props = {
  redirects: RedirectItem[];
};

const Home: NextPage<Props> = ({ redirects }) => {

  return (
    <div>
      <Head>
        <title>Practical Guide to Redirects in NextJS</title>
      </Head>

      <main className="container">
        <h1 className="text-xl my-2">NextJS Redirects Demo</h1>
        <table className="table w-full table-compact">
          <thead>
            <tr>
              <th>#</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Status Code</th>
            </tr>
          </thead>
          <tbody>
            {redirects.map((redirect, index) => {
              return (
                <tr key={index}>
                  <th>{index}</th>
                  <td>
                    <Link href={redirect.source} className="link">
                      {redirect.source}
                    </Link>
                  </td>
                  <td>{redirect.destination}</td>
                  <td>{redirect.statusCode}</td>
                </tr>
              );
            })}
            <tr>
              <th>{redirects.length}</th>
              <td><Link href={'/restricted-page'} className="link">/restricted-page</Link></td>
              <td>{'/login'}</td>
              <td>302</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      redirects: getAllRedirects(),
    },
  };
};
