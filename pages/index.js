import { useState } from "react";
import UrlItem from "@/components/UrlList/UrlItem";
import Link from "next/link";
import useSWR from "swr";
import generateID from "@/utils/generateID";
import SuccessKid from "../assets/img/success-kid.gif";
import Image from "next/image";
import styled from "styled-components";

export default function Home({
  shortUrls,
  setShortUrls,
  error,
  isLoading,
  mongoData,
}) {
  const [successForm, setSuccessForm] = useState(false);
  const { mutate } = useSWR(`/api/urls`);
  //const { data: mongoData, error, isLoading } = useSWR(`/api/urls`);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading data from db...</div>;
  const lastItem = mongoData.at(-1);

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
    <section>
      <StyledSubHeading>The Amazing</StyledSubHeading>
      <h1>URL Shortener</h1>
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
        <button className="cool-button">Shorten URL</button>
      </StyledForm>
      {successForm === true ? (
        <StyledImage
          alt="success kid gif"
          src={SuccessKid}
          width={160}
          height={120}
        />
      ) : null}
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
    </section>
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
  }
  > button {
    background-color: var(--lavender);
    color: var(--crust);
    font-weight: 200;
    font-stretch: 75%;
    font-variation-settings: "ital" 10, "wdth" 125;
    padding: 0 1rem;
  }
`;

const StyledImage = styled(Image)`
  filter: drop-shadow(4px 6px 0 var(--text));
  border-radius: 2px;
  margin-bottom: 1.4rem;
`;

const StyledSubHeading = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 300;
  font-stretch: 75%;
  font-variation-settings: "ital" 10, "wdth" 125;
  letter-spacing: 0.4rem;
`;
