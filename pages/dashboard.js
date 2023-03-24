import UrlList from "@/components/UrlList";
import styled from "styled-components";

export default function Dashboard({
  shortUrls,
  setShortUrls,
  mutate,
  mongoData,
}) {
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
          mongoData={mongoData}
        />
      </main>
    </>
  );
}

const StyledSubHeading = styled.span`
  color: var(--white);
  font-size: 1.4rem;
  font-weight: 400;
  font-stretch: 75%;
  font-variant: small-caps;
  letter-spacing: 0.4rem;
  padding: 0 0.2rem;
  text-shadow: 1px 1px 0 var(--text);
`;
