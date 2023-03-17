import { useEffect } from "react";
import SuccessKid from "assets/img/success-kid.gif";
import Image from "next/image";
import styled from "styled-components";
import Banner from "../Banner";

export default function Popup({ setShowPopup }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 2300);
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
  //i don't understand completely this rainbow effect. Is it okay to let this in?
  background: linear-gradient(
      rgba(255, 0, 0, 0.5) 0%,
      rgba(255, 154, 0, 0.5) 10%,
      rgba(208, 222, 33, 0.5) 20%,
      rgba(79, 220, 74, 0.5) 30%,
      rgba(63, 218, 216, 0.5) 40%,
      rgba(47, 201, 226, 0.5) 50%,
      rgba(28, 127, 238, 0.5) 60%,
      rgba(95, 21, 242, 0.5) 70%,
      rgba(186, 12, 248, 0.5) 80%,
      rgba(251, 7, 217, 0.5) 90%,
      rgba(255, 0, 0, 0.5) 100%
    )
    0 0/100% 200%;
  animation: a 2s linear infinite;
  z-index: 999;
  @keyframes a {
    to {
      background-position: 0 -200%;
    }
  }
`;

const StyledImage = styled(Image)`
  filter: drop-shadow(4px 6px 0 var(--text));
  border-radius: 2px;
  margin-bottom: 1.4rem;
`;
