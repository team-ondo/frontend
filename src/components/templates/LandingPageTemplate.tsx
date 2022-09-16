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
        <meta name="description" content="Welcome to ONDO!" />
        <meta property="og:site_name" content="ONDO" />
        <meta property="og:title" content="ONDO" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Welcome to ONDO!" />
        <title>ONDO</title>
      </Head>
      <main className="main--lp">{props.children}</main>
      {/* <Footer /> */}
    </>
  );
}