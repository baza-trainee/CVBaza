import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import db from "@/db";

const handler = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID || "",
    //   clientSecret: process.env.GITHUB_SECRET || "",
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // session: {}
  // callbacks: {}
  // pages: {}
});

export { handler };
