import Link from "next/link";
import styled from "styled-components";
import { CiHome } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import { useRouter } from "next/router";

export default function Navi() {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <Nav>
      <List>
        <StyledLink href="/" className={currentRoute === "/" ? "active" : ""}>
          <CiHome className="icon" />
        </StyledLink>

        <StyledLink
          href="/dashboard"
          className={currentRoute === "/dashboard" ? "active" : ""}
        >
          <CiBoxList className="icon" />
        </StyledLink>
      </List>
    </Nav>
  );
}

const Nav = styled.nav`
  background-color: var(--base);
  position: fixed;
  bottom: 0;
  min-width: 100%;
  z-index: 100;
`;

const List = styled.ul`
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
  font-size: 2rem;
  list-style: none;
  border-top: 1px solid var(--mantle);
`;

const StyledLink = styled(Link)`
  text-align: center;
  width: 100%;
  padding: 1.4rem 0;
`;
