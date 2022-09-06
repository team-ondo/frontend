import React from "react";
import Head from "next/head";

type Props = {
  pageid: string;
  children: JSX.Element;
};

export default function PageTemplate(props: Props) {
  return (
    <>
      <Head>
      <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="description"
          content="description"
        />
        <meta
          property="og:site_name"
          content="site name"
        />
        <meta
          property="og:title"
          content="title"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="description"
        />
        <title>
          title
        </title>
      </Head>
      {/* <Header /> */}
      <main>
        {props.children}
      </main>
      {/* <Footer /> */}
    </>
  );
}
