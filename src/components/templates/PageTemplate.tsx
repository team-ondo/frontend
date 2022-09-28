import React from "react";
import Head from "next/head";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

type Props = {
  pageid: string;
  children: JSX.Element;
};

export default function PageTemplate({ pageid, children }: Props) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="description"
          content="Peace of Mind. Ondo monitors extremes of temperature and humidity, protecting those you care for."
        />
        <meta property="og:site_name" content="ONDO" />
        <meta property="og:title" content="ONDO" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Peace of Mind. Ondo monitors extremes of temperature and humidity, protecting those you care for."
        />
        <title>ONDO</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
