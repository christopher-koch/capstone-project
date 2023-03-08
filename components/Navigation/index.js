import Link from "next/link";
import styled from "styled-components";

export default function Navi() {
  return (
    <Nav>
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  flex-basis: 1;
  bottom: 0;
  min-width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 2rem 0;
  box-sizing: border-box;
  border: 1px dotted #000;
`;
