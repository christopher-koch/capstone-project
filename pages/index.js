import { validUrlCharacters } from "@/data/valid-url-characters";
import { useState } from "react";
import UrlItem from "@/components/UrlList/UrlItem";
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
    event.target.reset();
  };

  return (
    <main>
      <h1>Shorten Urls</h1>
      <p>
        Enter a long Url and press the Button to shorten it! You can see all
        shortened Links on the{" "}
        {
          <Link href="/dashboard" aria-label="Link to Overview Page">
            Overview Page
          </Link>
        }
      </p>
      <form onSubmit={handleSubmit} aria-label="URL Shortener Form">
        <input
          name="input"
          id="input"
          type="url"
          required
          placeholder="https://paste-long-url.com"
        />
        <button className="cool-button">Shorten URL</button>
      </form>
      {successForm === true ? <p>URL was shortened successfully!</p> : null}
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
