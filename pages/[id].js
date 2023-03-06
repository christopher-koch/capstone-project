import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RedirectComponent({ shortUrls }) {
  const [urls, setUrls] = useState(shortUrls);
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  useEffect(() => {
    setUrls(shortUrls);
    console.log("id datei:");
    console.log(urls);
  }, [shortUrls, urls]);

  console.log(urls);
  console.log(shortUrls + "test");

  /*  urls.find((url) => {
    id === url.id ? router.push(url.longURL) : null;
  }); */

  return (
    <>
      <p>Redirecting...</p>
    </>
  );
}
