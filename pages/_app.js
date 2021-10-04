import React from "react";
import "styles/globals.css";
import Header from "components/Header";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <React.StrictMode>
        <Component {...pageProps} />
      </React.StrictMode>
    </>
  );
}
