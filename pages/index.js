import styled from "styled-components";
import { validUrlCharacters } from "@/data/valid-url-characters";
import { useState } from "react";
import UrlItem from "@/components/UrlList/UrlItem";

function generateID() {
  let randomText = "";
  for (let i = 5; i > 0; i--) {
    randomText += validUrlCharacters.at(
      Math.floor(Math.random() * validUrlCharacters.length)
    );
  }
  return randomText;
}

export default function Home({ shortUrls, setShortUrls }) {
  const [successForm, setSuccessForm] = useState(false);
  const lastItem = shortUrls.at(-1);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const { input } = data;
    const newUrl = new URL(input);
    const shortURL = generateID();
    // Extend later with ID and other stuff - or at another point?
    setShortUrls([
      ...shortUrls,
      { longURL: input, shortURL: shortURL, id: shortURL, count: 0 },
    ]);
    if (newUrl.protocol === "http:" || newUrl.protocol === "https:") {
      setSuccessForm(true);
    }
    console.log(lastItem);
    event.target.reset();
  };

  return (
    <main>
      <Heading>Paste a long URL and click the Shorten-Button</Heading>
      <form onSubmit={handleSubmit} aria-label="URL Shortener Form">
        <input
          name="input"
          id="input"
          type="url"
          required
          placeholder="https://google.com"
        />
        <button>Shorten URL</button>
      </form>
      {successForm === true ? <p>URL was shortened successfully!</p> : null}
      <p>
        Here will stand some additional info about this service. For example, a
        link to the Dashboard to see all links.
      </p>
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

const Heading = styled.h1`
  text-align: center;
`;
