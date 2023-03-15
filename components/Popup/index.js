import { useState, useEffect } from "react";
import SuccessKid from "assets/img/success-kid.gif";
import Image from "next/image";
import styled from "styled-components";
import Banner from "../Banner";

export default function Popup({ setShowPopup }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledPopupContainer>
      <Banner direction={"normal"} />
      <StyledImage
        alt="success kid gif"
        src={SuccessKid}
        width={320}
        height={240}
      />
      <Banner direction={"reversed"} />
    </StyledPopupContainer>
  );
}

const StyledPopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const StyledImage = styled(Image)`
  filter: drop-shadow(4px 6px 0 var(--text));
  border-radius: 2px;
  margin-bottom: 1.4rem;
`;
