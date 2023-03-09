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
          <CiHome />
        </StyledLink>

        <StyledLink
          href="/dashboard"
          className={currentRoute === "/dashboard" ? "active" : ""}
        >
          <CiBoxList />
        </StyledLink>
      </List>
    </Nav>
  );
}

const Nav = styled.nav`
  background-color: #fff;
  position: fixed;
  bottom: 0;
  min-width: 100%;
  z-index: 100;
`;

const List = styled.ul`
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
  border: 1px dotted #000;
  font-size: 2rem;
  list-style: none;
  > * {
    border-right: 1px dotted #000;
  }
  > *:last-child {
    border: none;
  }
`;

const StyledLink = styled(Link)`
  text-align: center;
  width: 100%;
  padding: 2rem 0;
`;
