import styled from "styled-components";
import UrlItem from "./UrlItem";
import useSWR from "swr";

export default function UrlList({ shortUrls, setShortUrls, mutate }) {
  const { data: mongoData, error, isLoading } = useSWR(`/api/urls`);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading data from db...</div>;

  return (
    <ItemContainer>
      {mongoData.map((url) => (
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
}

const ItemContainer = styled.section`
  display: grid;
  gap: 3rem;
`;
