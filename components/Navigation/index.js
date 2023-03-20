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
        <li>
          <StyledLink
            href="/"
            className={currentRoute === "/" ? "active" : "inactive"}
          >
            <CiHome
              className={
                currentRoute === "/" ? "icon-nav-active icon-nav" : "icon-nav"
              }
            />
          </StyledLink>
        </li>
        <li>
          <StyledLink
            href="/dashboard"
            className={currentRoute === "/dashboard" ? "active" : "inactive"}
          >
            <CiBoxList
              className={
                currentRoute === "/dashboard"
                  ? "icon-nav-active icon-nav"
                  : "icon-nav"
              }
            />
          </StyledLink>
        </li>
      </List>
    </Nav>
  );
}

const Nav = styled.nav`
  background-color: var(--white);
  position: fixed;
  top: 1rem;
  min-width: 90%;
  z-index: 5;
  border-radius: 5px;
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid var(--text);
  filter: drop-shadow(4px 6px 0 var(--text));
`;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  list-style: none;
`;

const StyledLink = styled(Link)`
  height: 1.6rem;
  width: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;
