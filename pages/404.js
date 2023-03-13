import { useRouter } from "next/router";
import Image from "next/image";
import Gandalf from "../assets/img/404-gif.webp";
import Link from "next/link";
import { useEffect } from "react";

export default function NotAvailable() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 7000);
  });

  return (
    <>
      <Image
        src={Gandalf}
        width={480}
        height={200}
        alt="gandalf shall not pass gif"
      />
      <h1>This page doesn't exist.</h1>
      <p>
        You'll be redirect automatically to the homepage. If not,{" "}
        <Link href="/">click here</Link>
      </p>
    </>
  );
}
