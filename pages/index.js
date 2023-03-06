import styled from "styled-components";
import { validUrlCharacters } from "@/data/valid-url-characters";
import { initialUrls } from "@/data/initial-urls";
import { useState } from "react";
import Link from "next/link";

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
  //const [urls, setUrls] = useState([]);
  //const [shortUrls, setShortUrls] = useState(initialUrls);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get Value from Input
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const { input } = data;

    // Store Value in Object
    //setUrls([...urls, { longURL: input }]);
    //console.log(urls);

    // Verketten von Events bei Klick (Get Value, Store Value, create new Array with short-ID, ...)
    // Extend later with ID and other stuff -  or at another point?
    shortUrls.map((element) => {
      const shortURL = generateID();
      setShortUrls([
        ...shortUrls,
        { ...element, longURL: input, shortURL: shortURL, id: shortURL },
      ]);
      console.log(`Index Datei:`);
      console.log(shortUrls);
    });

    // random ShortURL
    event.target.reset();
  };

  return (
    <main>
      <Heading>Paste a long URL and click the Shorten-Button</Heading>
      <form onSubmit={handleSubmit}>
        {/*         Wie kann ich in einer Form nur URLs zulassen? */}
        <input
          name="input"
          id="input"
          type="url"
          required
          placeholder="https://google.com"
        />
        <button>Shorten URL</button>
      </form>
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
