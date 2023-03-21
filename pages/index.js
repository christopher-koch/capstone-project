import { useState } from "react";
import UrlItem from "@/components/UrlList/UrlItem";
import Link from "next/link";
import useSWR from "swr";
import generateID from "@/utils/generateID";
import styled from "styled-components";
import Popup from "@/components/Popup";
import Image from "next/image";
import LoadingImage from "assets/img/loading-screen.gif";
import ErrorImage from "assets/img/error.gif";
import { useSession } from "next-auth/react";

export default function Home({
  shortUrls,
  setShortUrls,
  error,
  isLoading,
  mongoData,
}) {
  const [successForm, setSuccessForm] = useState(false);
  const { mutate } = useSWR(`/api/urls`);
  const [showPopup, setShowPopup] = useState(false);
  const { data: session } = useSession();

  if (error)
    return (
      <StyledLoadingContainer>
        <StyledImage
          alt="Error gif meme"
          src={ErrorImage}
          width={250}
          height={188}
        />
        <p>Houston, we got a problem...</p>
      </StyledLoadingContainer>
    );
  if (isLoading)
    return (
      <StyledLoadingContainer>
        <StyledImage
          alt="Loading gif meme"
          src={LoadingImage}
          width={240}
          height={240}
        />
        <p>Wait a second...</p>
      </StyledLoadingContainer>
    );
  const lastItem = mongoData.at(-1);

  async function handleSubmit(event) {
    event.preventDefault();
    setShowPopup(true);
    const formData = new FormData(event.target);
    const urlData = Object.fromEntries(formData);
    const { input } = urlData;
    const shortURL = generateID();
    const newUrl = new URL(input);

    setShortUrls([
      ...shortUrls,
      { longURL: input, shortURL: shortURL, id: shortURL, count: 0 },
    ]);

    const newUrlData = {
      longURL: input,
      shortURL: shortURL,
      count: 0,
      ...(session && { author: session.user.name }),
    };

    const response = await fetch("/api/urls", {
      method: "POST",
      body: JSON.stringify(newUrlData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Status ", data.status);
      mutate();
      event.target.reset();
    } else {
      console.error("Error", response.status);
    }

    if (newUrl.protocol === "http:" || newUrl.protocol === "https:") {
      setSuccessForm(true);
    }

    event.target.reset();
  }

  return (
    <main className="main-container">
      {showPopup === true ? <Popup setShowPopup={setShowPopup} /> : null}
      <StyledSubHeading>The Amazing</StyledSubHeading>
      <h1>
        <span>URL Shortener</span>
      </h1>
      <p>
        Enter a long Url and press the Button to shorten it! You can see all
        shortened Links on the{" "}
        {
          <Link href="/dashboard" aria-label="Link to Overview Page">
            Overview Page
          </Link>
        }
      </p>
      <StyledForm onSubmit={handleSubmit} aria-label="URL Shortener Form">
        <input
          name="input"
          id="input"
          type="url"
          required
          placeholder="https://paste-long-url.com"
        />
        <button>Short it!</button>
      </StyledForm>
      {successForm === false ? null : (
        <UrlItem
          key={lastItem.id}
          longURL={lastItem.longURL}
          shortURL={lastItem.shortURL}
          id={lastItem.id}
          count={lastItem.count}
          shortUrls={shortUrls}
          setShortUrls={setShortUrls}
          setSuccessForm={setSuccessForm}
        />
      )}
    </main>
  );
}

const StyledForm = styled.form`
  background-color: #fff;
  border: 2px solid var(--text);
  border-radius: 2px;
  width: 100%;
  display: flex;
  margin: 1.4rem 0;
  filter: drop-shadow(4px 6px 0 var(--text));
  > input {
    background: transparent;
    border: none;
    padding: 0.6rem 1rem;
    flex: 2;
    font-weight: 300;
    font-variant: small-caps;
    letter-spacing: 0.1rem;
    &:focus-visible {
      outline: none;
    }
  }
  > button {
    background-color: var(--primary-highlight);
    font-weight: 700;
    color: var(--text);
    font-stretch: 75%;
    padding: 0 1rem;
  }
`;

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

const StyledLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledImage = styled(Image)`
  filter: drop-shadow(4px 6px 0 var(--text));
  border-radius: 2px;
  margin-bottom: 1.4rem;
`;
