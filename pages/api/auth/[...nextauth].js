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
  callbacks: {
    async redirect(url, baseUrl) {
      return `${NEXT_PUBLIC_VERCEL_URL}`;
    },
  },
};
export default NextAuth(authOptions);
