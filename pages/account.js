import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function Account() {
  const { data: session } = useSession({ required: true });
  const router = useRouter();

  if (session) {
    return (
      <StyledContainer>
        Welcome {session.user.name} <br />{" "}
        <StyledProfilePic
          alt="Profile picture"
          src={session.user.image}
          width={50}
          height={50}
        />
        <StyledButtonContainer>
          <StyledButton onClick={() => signOut()}>Sign out</StyledButton>
          <StyledButton onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </StyledButton>
        </StyledButtonContainer>
      </StyledContainer>
    );
  } else {
    return <div> Not logged in.</div>;
  }
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  padding: 25% 5%;
`;

const StyledProfilePic = styled(Image)`
  border-radius: 50px;
  border: 2px solid var(--text);
  filter: drop-shadow(4px 6px 0 var(--text));
`;

const StyledButton = styled.button`
  background-color: var(--secondary-highlight);
  font-weight: 700;
  color: var(--text);
  font-stretch: 75%;
  padding: 0.6rem 1rem;
  border: 2px solid var(--text);
  border-radius: 2px;
  filter: drop-shadow(4px 6px 0 var(--text));
  max-width: 150px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
