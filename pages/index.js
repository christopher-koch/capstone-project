import { validUrlCharacters } from "@/data/valid-url-characters";
import { useState } from "react";
import UrlItem from "@/components/UrlList/UrlItem";
import Link from "next/link";
import useSWR from "swr";

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
  // mutate = neu laden lostreten (?)
  const { mutate } = useSWR(`/api/urls`);

  const { data } = useSWR(`/api/urls`);
  console.log(data);

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
