import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { redirect } from "next/dist/server/api-utils";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      secret: process.env.NEXTAUTH_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  // always return Internal Server Error (500)
  /* callbacks: {
    async redirect() {
      signIn(undefined, {
        callbackUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
      });
    },
  }, */
};
export default NextAuth(authOptions);
