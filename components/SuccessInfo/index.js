import styled from "styled-components";

export default function SuccessInfo() {
  return (
    <StyledContainer>
      <span role={"success"}>Copied Successfully</span>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  opacity: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-highlight);
  border: 1px solid var(--text);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  right: 1rem;
  top: 4.6rem;
  animation: my-animation 1.5s ease-in;
  > span {
    color: var(--text);
    font-size: 0.6rem;
    font-weight: 700;
  }
  @keyframes my-animation {
    0% {
      opacity: 0;
      top: 7rem;
    }
    10% {
      opacity: 1;
      top: 4.6rem;
    }
    85% {
      opacity: 1;
      top: 4.6rem;
    }
    100% {
      opacity: 20;
      top: 6rem;
    }
  }
`;
