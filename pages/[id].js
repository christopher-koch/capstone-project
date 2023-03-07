import { useRouter } from "next/router";

export default function RedirectComponent({ shortUrls }) {
  const router = useRouter();
  const { id } = router.query;

  shortUrls.find((url) => {
    id === url.id ? router.push(url.longURL) : null;
  });

  return (
    <>
      <h2>Please hold the line</h2>
      <p>You are on being redirected to {shortUrls.longURL}</p>
    </>
  );
}
