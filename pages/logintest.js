import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginTest() {
  const { data: session } = useSession();
  console.log(session);

  async function addUserToDatabase() {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        name: session.user.name,
        email: session.user.email,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Status ", data.status);
      //mutate();
    } else {
      console.error("Error", response.status);
    }
  }
  if (session) {
    addUserToDatabase();
    return (
      <div className="main-container">
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div className="main-container">
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
