import React from "react";
import Head from "next/head";
import { PageTitle } from "config";

export default function Header() {
  return (
    <Head>
      <title>{PageTitle}</title>
      <meta name="description" content="Search movies/series in one place!" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
  );
}
