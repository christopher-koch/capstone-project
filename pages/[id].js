import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function RedirectComponent({ shortUrls }) {
  const router = useRouter();
  const { id } = router.query;
  let isShortUrl = true;

  shortUrls.find((url) => {
    id === url.id ? router.push(url.longURL) : (isShortUrl = false);
  });

  return (
    <>
      {isShortUrl === true ? (
        <>
          <h2>Please hold the line.</h2>
          <p>You are being redirected to {shortUrls.longURL}</p>
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
