import Link from "next/link";
import styled from "styled-components";
import { CiHome } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import { useRouter } from "next/router";

export default function Navi() {
  console.log(Link);
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <Nav>
      <List>
        <Link
          href="/"
          className={"link" + ` ${currentRoute === "/" ? "active" : ""}`}
        >
          <CiHome />
        </Link>

        <Link
          href="/dashboard"
          className={
            "link" + ` ${currentRoute === "/dashboard" ? "active" : ""}`
          }
        >
          <CiBoxList />
        </Link>
      </List>
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  min-width: 100%;
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

const ListItem = styled.li``;
