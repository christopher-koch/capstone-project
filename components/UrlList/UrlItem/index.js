import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { VscTrash } from "react-icons/vsc";
import { VscEdit } from "react-icons/vsc";
import { VscCopy } from "react-icons/vsc";
import { VscError } from "react-icons/vsc";
import SuccessInfo from "@/components/SuccessInfo";

export default function UrlItem({
  id,
  longURL,
  shortURL,
  count,
  shortUrls,
  setShortUrls,
  setSuccessForm,
  mutate,
}) {
  const [editing, setEditing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleDelete = async (e) => {
    setSuccessForm(false);
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

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/${shortURL}`
    );
    setCopySuccess(true);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setCopySuccess(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [copySuccess]);

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
  };

  return (
    <>
      <ListItem>
        <StyledLongLabel>Long Url</StyledLongLabel>
        <StyledLongUrl>{longURL}</StyledLongUrl>
        <StyledShortLabel>Short Url</StyledShortLabel>
        {copySuccess === true ? <SuccessInfo /> : null}
        <StyledShortUrl
          id={id}
          href={shortURL}
          target="_blank"
          onClick={(e) => handleLinkClick(e)}
        >
          {process.env.NEXT_PUBLIC_VERCEL_URL}/{shortURL}
          <StyledCopyButton onClick={handleCopy}>
            <VscCopy />
          </StyledCopyButton>
        </StyledShortUrl>
        <StyledOptions>
          <div className="delete-container">
            <StyledDelete id={shortURL} onClick={(e) => handleDelete(e)}>
              <VscTrash className="icon" />
            </StyledDelete>
          </div>
          {editing === false ? null : (
            <StyledEditContainer>
              <span>Press ⏎ to save</span>
              <StyledEditInput
                id={shortURL}
                placeholder={shortURL}
                type="text"
                onKeyDown={(e) => handleEditDone(e, id)}
              />
            </StyledEditContainer>
          )}
          {editing === true ? (
            <StyledEditReset id={shortURL} onClick={() => handleEdit()}>
              <VscError />
            </StyledEditReset>
          ) : (
            <StyledEdit id={shortURL} onClick={() => handleEdit()}>
              <VscEdit />
            </StyledEdit>
          )}

          <StyledCounter>{count}</StyledCounter>
        </StyledOptions>
      </ListItem>
    </>
  );
}

const ListItem = styled.div`
  position: relativ;
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
  margin-bottom: 4rem;
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
  justify-content: flex-end;
`;

const StyledDelete = styled.button`
  font-size: 1.2rem;
  background-color: var(--lightred);
  color: var(--red);
  border-radius: 2px;
  padding: 0.4rem 0.6rem;
`;

const StyledEditContainer = styled.div`
  display: column;
  margin-top: -15px;
  text-align: end;
  > span {
    font-size: 10px;
    font-style: italic;
    color: var(--base);
    margin-right: 1.4rem;
  }
`;

const StyledEdit = styled.button`
  font-size: 1.2rem;
  background-color: var(--lightblue);
  color: var(--blue);
  border-radius: 2px;
  padding: 0.4rem 0.6rem;
`;

const StyledEditReset = styled.button`
  font-size: 1.2rem;
  background-color: var(--lightorange);
  color: var(--orange);
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
  flex-shrink: 0;
`;

const StyledEditInput = styled.input`
  background-color: var(--lightgray);
  color: var(--text);
  border: 2px solid var(--text);
  border-radius: 2px;
  padding: 0.4rem 0.6rem;
  width: 100px;
  &:focus-visible {
    outline: none;
  }
`;
