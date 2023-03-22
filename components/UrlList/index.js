import styled from "styled-components";
import UrlItem from "./UrlItem";
import useSWR from "swr";
import { useSession, sign } from "next-auth/react";
import Link from "next/link";

export default function UrlList({ shortUrls, setShortUrls, mutate }) {
  const { data: mongoData, error, isLoading } = useSWR(`/api/urls`);
  const { data: session } = useSession();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading data from db...</div>;
  if (session) {
    return (
      <ItemContainer>
        {mongoData
          .filter((entry) => entry.author === session.user.name)
          .slice(0)
          .reverse()
          .map((url) => (
            <UrlItem
              key={url.shortURL}
              longURL={url.longURL}
              shortURL={url.shortURL}
              id={url.id}
              count={url.count}
              shortUrls={shortUrls}
              setShortUrls={setShortUrls}
              mutate={mutate}
            />
          ))}
      </ItemContainer>
    );
  } else {
    return (
      <div>
        To view shortened URLs, first <Link href="/account">sign in</Link>, then
        shorten URLs.{" "}
      </div>
    );
  }
}

const ItemContainer = styled.section`
  display: grid;
  gap: 3rem;
`;
