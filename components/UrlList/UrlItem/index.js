import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { VscTrash } from "react-icons/vsc";
import { VscEdit } from "react-icons/vsc";
import { VscCopy } from "react-icons/vsc";

export default function UrlItem({
  id,
  longURL,
  shortURL,
  count,
  shortUrls,
  setShortUrls,
}) {
  const [editing, setEditing] = useState(false);

  const handleDelete = (e) => {
    console.log(e);
    const filteredArray = shortUrls.filter((url) => url.id !== e.target.id);
    setShortUrls(filteredArray);
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
    <>
      <ListItem>
        <section>
          <Span>{longURL}</Span>
          <Link
            id={id}
            href={shortURL}
            target="_blank"
            onClick={(e) => handleLinkClick(e)}
          >
            {`${process.env.NEXT_PUBLIC_VERCEL_URL}/${shortURL}`}
          </Link>
        </section>
        <section>
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_VERCEL_URL}/${shortURL}`
              )
            }
          >
            <VscCopy className="icon" />
          </button>
          <button id={id} onClick={(e) => handleDelete(e)}>
            <VscTrash className="icon" />
          </button>
          <button id={id} onClick={() => handleEdit()}>
            <VscEdit className="icon" />
          </button>
          {editing === false ? null : (
            <Input
              id={id}
              placeholder={shortURL}
              type="text"
              onKeyDown={(e) => handleEditDone(e, id)}
            />
          )}
          <Span>{count} Clicks</Span>
        </section>
      </ListItem>
    </>
  );
}

const ListItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
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
