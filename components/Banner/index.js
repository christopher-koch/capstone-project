import styled from "styled-components";

export default function Banner({ direction }) {
  console.log(direction);
  return (
    <StyledContainer>
      <StyledText className={direction}>
        AMAZING! AMAZING! AMAZING! AMAZING! AMAZING!
      </StyledText>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  background-color: var(--yellow);
  width: 100%;
  color: #fff;
  padding: 5px;
`;

const StyledText = styled.p`
  color: var(--text);
  white-space: nowrap;
  font-size: 2rem;
  font-weight: 900;
  font-style: italic;
`;
