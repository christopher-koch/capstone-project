import { useRouter } from "next/router";
import Link from "next/link";

export default function RedirectComponent({ mongoData }) {
  const router = useRouter();
  const { id: slug } = router.query;
  console.log(slug);
  let isShortUrl = true;
  mongoData?.find((url) => {
    slug === url.shortURL ? router.push(url.longURL) : (isShortUrl = false);
  });

  return (
    <>
      {isShortUrl === true ? (
        <>
          <h2>Please hold the line.</h2>
          <p>You are being redirected to {mongoData?.longURL}</p>
        </>
      ) : (
        <p>
          This short URL is not available.{" "}
          <Link href="/">Click here to go back</Link>
        </p>
      )}
    </>
  );
}
