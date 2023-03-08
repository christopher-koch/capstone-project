import Link from "next/link";
import styled from "styled-components";
import { CiHome } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";

export default function Navi() {
  return (
    <Nav>
      <List>
        <ListItem>
          <Link href="/">
            <CiHome />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/dashboard">
            <CiBoxList />
          </Link>
        </ListItem>
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

const ListItem = styled.li`
  text-align: center;
  width: 100%;
  padding: 2rem 0;
`;
