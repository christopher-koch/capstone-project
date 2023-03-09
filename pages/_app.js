import { SWRConfig } from "swr";
import GlobalStyle from "@/styles";
import Head from "next/head";
import useLocalStorageState from "use-local-storage-state";
import { initialUrls } from "@/data/initial-urls";
import Navi from "@/components/Navigation";

const fetcher = (url) => fetch(url).then((r) => r.json());

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
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
          shortUrls={shortUrls}
          setShortUrls={setShortUrls}
        />
        <Navi />
      </SWRConfig>
    </>
  );
}
