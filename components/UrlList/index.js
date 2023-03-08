import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import UrlItem from "./UrlItem";

export default function UrlList({ shortUrls, setShortUrls }) {
  return (
    <UnorderedList>
      {shortUrls.map((url) => (
        <UrlItem
          key={url.id}
          longURL={url.longURL}
          shortURL={url.shortURL}
          id={url.id}
          count={url.count}
          shortUrls={shortUrls}
          setShortUrls={setShortUrls}
        />
      ))}
    </UnorderedList>
  );
}

const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
`;
