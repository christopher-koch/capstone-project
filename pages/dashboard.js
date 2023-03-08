import UrlList from "@/components/UrlList";

export default function Dashboard({ shortUrls, setShortUrls }) {
  return <UrlList shortUrls={shortUrls} setShortUrls={setShortUrls} />;
}
