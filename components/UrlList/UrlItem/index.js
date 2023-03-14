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
  mutate,
}) {
  const [editing, setEditing] = useState(false);

  const handleDelete = async (e) => {
    await fetch(`/api/${e.target.id}`, {
      method: "DELETE",
    });
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleEditDone = async (e) => {
    if (e.key === "Enter") {
      setEditing(!editing);
      await fetch(`/api/${e.target.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...shortURL, shortURL: e.target.value }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      mutate();
      //Brauch ich später noch?
      /* setShortUrls(
        shortUrls.map((url) => {
          if (url.id === id) {
            return { ...url, shortURL: event.target.value };
          } else {
            return url;
          }
        })
      ); */
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
        <StyledLongLabel>Long Url</StyledLongLabel>
        <StyledLongUrl>{longURL}</StyledLongUrl>
        <StyledShortLabel>Short Url</StyledShortLabel>
        <StyledShortUrl
          id={id}
          href={shortURL}
          target="_blank"
          onClick={(e) => handleLinkClick(e)}
        >
          {process.env.NEXT_PUBLIC_VERCEL_URL}/{shortURL}
          <StyledCopyButton
            onClick={() =>
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_VERCEL_URL}/${shortURL}`
              )
            }
          >
            <VscCopy />
          </StyledCopyButton>
        </StyledShortUrl>
        <StyledOptions>
          <StyledDelete id={shortURL} onClick={(e) => handleDelete(e)}>
            <VscTrash />
          </StyledDelete>
          {editing === false ? null : (
            <Input
              id={shortURL}
              placeholder={shortURL}
              type="text"
              onKeyDown={(e) => handleEditDone(e, id)}
            />
          )}
          <StyledEdit id={shortURL} onClick={() => handleEdit()}>
            <VscEdit />
          </StyledEdit>
          <div className="count-container">
            📈<StyledCounter>{count}</StyledCounter>
          </div>
        </StyledOptions>
      </ListItem>
    </>
  );
}

const ListItem = styled.div`
  background-color: var(--white);
  border: 2px solid var(--text);
  filter: drop-shadow(4px 6px 0 var(--text));
  border-radius: 2px;
  padding: 1.2rem 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StyledLongUrl = styled.span`
  font-size: 0.7rem;
  font-weight: 350;
  font-variant: small-caps;
  letter-spacing: 0.15rem;
  color: var(--gray);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-bottom: 1.4rem;
`;

const StyledLongLabel = styled.div`
  color: var(--text);
  font-size: 0.8rem;
  font-variant: small-caps;
  font-weight: 700;
  padding-bottom: 0.4rem;
  &::after {
    content: " 🤮";
  }
`;

const StyledShortLabel = styled.div`
  color: var(--text);
  font-size: 0.8rem;
  font-variant: small-caps;
  font-weight: 700;
  padding-bottom: 0.4rem;
  &::after {
    content: " 🤩";
  }
`;

const StyledShortUrl = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-left: 0.8rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  background-color: var(--lightgray);
  color: var(--text);
  filter: drop-shadow(4px 6px 0 var(--base-light));
  border: 2px solid var(--text);
  border-radius: 2px;
  box-sizing: border-box;
`;

const StyledCopyButton = styled.button`
  background-color: var(--primary-highlight);
  font-size: 1.2rem;
  color: var(--text);
  padding: 0.4rem 0.7rem;
`;

const StyledOptions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledDelete = styled.button`
  font-size: 1.2rem;
  background-color: var(--lightred);
  color: var(--red);
  border-radius: 2px;
  padding: 0.4rem 0.6rem;
`;

const StyledEdit = styled.button`
  font-size: 1.2rem;
  background-color: var(--lightblue);
  color: var(--blue);
  border-radius: 2px;
  padding: 0.4rem 0.6rem;
`;

const StyledCounter = styled.span`
  font-size: 1.2rem;
  background-color: var(--lightgreen);
  color: var(--green);
  border-radius: 5rem;
  padding: 0.4rem 0.8rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100px;
  border: 1px solid #dfdfdf;
  outline: none;
`;
