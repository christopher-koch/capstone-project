import { SWRConfig } from "swr";
import GlobalStyle from "@/styles";
import Head from "next/head";
import useLocalStorageState from "use-local-storage-state";
import { initialUrls } from "@/data/initial-urls";
import Navi from "@/components/Navigation";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function App({ Component, pageProps }) {
  const {
    data: mongoData,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/urls`, fetcher);
  const [shortUrls, setShortUrls] = useLocalStorageState("shortUrls", {
    defaultValue: initialUrls,
  });

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <SWRConfig value={{ fetcher, refreshInterval: 5000 }}>
        <Component
          {...pageProps}
          shortUrls={shortUrls}
          setShortUrls={setShortUrls}
          mongoData={mongoData}
          error={error}
          isLoading={isLoading}
          mutate={mutate}
        />
        <Navi />
      </SWRConfig>
    </>
  );
}
