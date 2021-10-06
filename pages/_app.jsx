import React from "react";
import "styles/globals.css";
import Header from "components/Header";
import { AppWrapper } from "context/state";
import Head from "next/head";
import { PageTitle } from "utils/config";

export default function OmdbNext({ Component, pageProps }) {
  return (
    <>
      <AppWrapper>
        <Head>
          <title>{PageTitle}</title>
          <meta
            name="description"
            content="Search movies/series in one place!"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <React.StrictMode>
          <Header />
          <Component {...pageProps} />
        </React.StrictMode>
      </AppWrapper>
    </>
  );
}
