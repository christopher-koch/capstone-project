import { useRouter } from "next/router";
import Image from "next/image";
import Gandalf from "../assets/img/404-gif.webp";
import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";

export default function NotAvailable() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 7000);
  });

  return (
    <main className="main-container">
      <StyledImage
        src={Gandalf}
        width={300}
        height={160}
        alt="gandalf shall not pass gif"
      />
      <h1>This page doesn&apos;t exist.</h1>
      <p>
        You&apos;ll be redirect automatically to the homepage. If not,{" "}
        <Link href="/">click here</Link>
      </p>
    </main>
  );
}

const StyledImage = styled(Image)`
  filter: drop-shadow(4px 6px 0 var(--text));
  border-radius: 2px;
  margin-bottom: 1.4rem;
`;
