import UrlList from "@/components/UrlList";
import UrlItem from "@/components/UrlList/UrlItem";
export default function Dashboard({ shortUrls, setShortUrls }) {
  return (
    <>
      <main>
        <h1>Overview of all shortened Links</h1>
        <UrlList shortUrls={shortUrls} setShortUrls={setShortUrls} />
      </main>
    </>
  );
}
