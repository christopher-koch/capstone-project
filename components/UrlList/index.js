import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function UrlList({ shortUrls, setShortUrls }) {
  const [editing, setEditing] = useState(false);

  const handleDelete = (e) => {
    console.log(e);
    const filteredArray = shortUrls.filter((url) => url.id !== e.target.id);
    setShortUrls(filteredArray);
    // Wieso geht das nicht?
    //setShortUrls((current) => current.filter((url) => url !== url.target));
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleEditDone = (event, id) => {
    if (event.key === "Enter") {
      setEditing(!editing);
      setShortUrls(
        shortUrls.map((url) => {
          if (url.id === id) {
            return { ...url, shortURL: event.target.value };
          } else {
            return url;
          }
        })
      );
    }
  };

  const handleLinkClick = (e) => {
    setShortUrls(
      shortUrls.map((url) => {
        if (url.id === e.target.id) {
          return { ...url, count: url.count + 1 };
        } else {
          return url;
        }
      })
    );
    console.log(shortUrls);
  };

  return (
    <UnorderedList>
      {shortUrls.map((url) => (
        <ListItem key={url.id}>
          <Span>{url.longURL}</Span>
          <Span>
            <Link
              id={url.id}
              href={url.longURL}
              target="_blank"
              onClick={(e) => handleLinkClick(e)}
            >
              {`sho.rt/${url.shortURL}`}
            </Link>
          </Span>
          <button id={url.id} onClick={(e) => handleDelete(e)}>
            Delete
          </button>
          <button id={url.id} onClick={() => handleEdit()}>
            Edit
          </button>
          {editing === false ? null : (
            <Input
              id={url.id}
              placeholder={url.shortURL}
              type="text"
              onKeyDown={(e) => handleEditDone(e, url.id)}
            />
          )}
          <Span>{url.count} Clicks</Span>
        </ListItem>
      ))}
    </UnorderedList>
  );
}

const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  display: flex;
  flex-wrap: nowrap;
  gap: 1.4rem;
`;

const Span = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
`;

const Input = styled.input`
  width: 100px;
  border: 1px solid #dfdfdf;
  outline: none;
`;
