import UrlList from "@/components/UrlList";
import styled from "styled-components";

export default function Dashboard({ shortUrls, setShortUrls, mutate }) {
  return (
    <>
      <main className="main-container">
        <StyledSubHeading>The Amazing</StyledSubHeading>
        <h1>
          <span>Dashboard</span>
        </h1>
        <UrlList
          shortUrls={shortUrls}
          setShortUrls={setShortUrls}
          mutate={mutate}
        />
      </main>
    </>
  );
}

const StyledSubHeading = styled.span`
  font-size: 1rem;
  font-weight: 400;
  font-stretch: 75%;
  font-variant: small-caps;
  letter-spacing: 0.4rem;
`;
