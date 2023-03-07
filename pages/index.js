import styled from "styled-components";
import { validUrlCharacters } from "@/data/valid-url-characters";
import Link from "next/link";
import { useState } from "react";

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
      { longURL: input, shortURL: shortURL, id: shortURL },
    ]);
    if (newUrl.protocol === "http:" || newUrl.protocol === "https:") {
      console.log("Yay!");
      setSuccessForm(!false);
      console.log(successForm);
    }
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
      {successForm === true ? <p>Du bist der geilste!</p> : null}
      <p>
        Here will stand some additional info about this service. For example, a
        link to the Dashboard to see all links.
      </p>
      <ul>
        {shortUrls.map((url) => (
          <li key={url.id}>
            <h6>Long URL: {url.longURL}</h6>
            <Link href={url.longURL} target="_blank">
              {`short.link/${url.shortURL}`}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

const Heading = styled.h1`
  text-align: center;
`;
