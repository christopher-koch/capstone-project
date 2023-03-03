import styled from "styled-components";
import { validUrlCharacters } from "@/data/valid-url-characters";
import { useState } from "react";

export default function Home() {
  const [urls, setUrls] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get Value from Input
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const { input } = data;

    // Store Value in Object
    setUrls([...urls, { input }]);
    console.log(urls);

    // random ShortURL
    let randomText = "";
    for (let i = 5; i > 0; i--) {
      randomText += validUrlCharacters.at(
        Math.floor(Math.random() * validUrlCharacters.length)
      );
    }
  };

  return (
    <main>
      <Heading>Paste a long URL and click the Shorten-Button</Heading>
      <form onSubmit={handleSubmit}>
        <input name="input" id="input" required placeholder="Enter Link here" />
        <button>Shorten URL</button>
      </form>
      <p>
        Here will stand some additional info about this service. For example, a
        link to the Dashboard to see all links.
      </p>
      <ul>
        {urls.map((entry) => (
          <li>{entry.input}</li>
        ))}
      </ul>
    </main>
  );
}

const Heading = styled.h1`
  text-align: center;
`;
