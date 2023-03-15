import { useState } from "react";
import UrlItem from "@/components/UrlList/UrlItem";
import Link from "next/link";
import useSWR from "swr";
import generateID from "@/utils/generateID";
import styled from "styled-components";
import Popup from "@/components/Popup";

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

  //const { data: mongoData, error, isLoading } = useSWR(`/api/urls`);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading data from db...</div>;
  const lastItem = mongoData.at(-1);

  function handlePopup() {
    setShowPopup(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const urlData = Object.fromEntries(formData);
    const { input } = urlData;
    const shortURL = generateID();
    const newUrl = new URL(input);
    // Extend later with ID and other stuff - or at another point?
    setShortUrls([
      ...shortUrls,
      { longURL: input, shortURL: shortURL, id: shortURL, count: 0 },
    ]);
    const newUrlData = { longURL: input, shortURL: shortURL, count: 0 };
    console.log(newUrlData);
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
      <button onClick={handlePopup}>Show Popup</button>
      {showPopup === true ? <Popup setShowPopup={setShowPopup} /> : null}
      <StyledForm onSubmit={handleSubmit} aria-label="URL Shortener Form">
        <input
          name="input"
          id="input"
          type="url"
          required
          placeholder="https://paste-long-url.com"
        />
        <button className="cool-button">Short it!</button>
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
    color: var(--crust);
    font-weight: 200;
    font-stretch: 75%;
    padding: 0 1rem;
  }
`;

const StyledSubHeading = styled.span`
  font-size: 1rem;
  font-weight: 400;
  font-stretch: 75%;
  font-variant: small-caps;
  letter-spacing: 0.4rem;
`;
