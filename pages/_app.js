import GlobalStyle from "@/styles";
import Head from "next/head";
import { useState, useEffect } from "react";
import { initialUrls } from "@/data/initial-urls";

export default function App({ Component, pageProps }) {
  const [shortUrls, setShortUrls] = useState(initialUrls);
  useEffect(() => {
    setShortUrls(shortUrls);
    console.log("app js datei:");
    console.log(shortUrls);
  }, [shortUrls]);

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <Component
        {...pageProps}
        shortUrls={shortUrls}
        setShortUrls={setShortUrls}
      />
    </>
  );
}
