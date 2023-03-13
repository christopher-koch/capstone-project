import UrlList from "@/components/UrlList";
export default function Dashboard({ shortUrls, setShortUrls, mutate }) {
  return (
    <>
      <main>
        <h1>Overview of all shortened Links</h1>
        <UrlList
          shortUrls={shortUrls}
          setShortUrls={setShortUrls}
          mutate={mutate}
        />
      </main>
    </>
  );
}
