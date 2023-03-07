import GlobalStyle from "@/styles";
import Head from "next/head";
import useLocalStorageState from "use-local-storage-state";
import { initialUrls } from "@/data/initial-urls";

export default function App({ Component, pageProps }) {
  const [shortUrls, setShortUrls] = useLocalStorageState("shortUrls", {
    defaultValue: initialUrls,
  });

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
