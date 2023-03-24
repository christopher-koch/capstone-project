import { SWRConfig } from "swr";
import GlobalStyle from "@/styles";
import Head from "next/head";
import useLocalStorageState from "use-local-storage-state";
import { initialUrls } from "@/data/initial-urls";
import Navi from "@/components/Navigation";
import useSWR from "swr";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";

const myFont = localFont({ src: "../next/font/local/Mona-Sans.woff2" });
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
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
      <SWRConfig value={{ fetcher }}>
        <main className={myFont.className}>
          <SessionProvider session={session}>
            <Component
              {...pageProps}
              shortUrls={shortUrls}
              setShortUrls={setShortUrls}
              mongoData={mongoData}
              error={error}
              isLoading={isLoading}
              mutate={mutate}
            />
          </SessionProvider>
        </main>
        <Navi />
      </SWRConfig>
    </>
  );
}
