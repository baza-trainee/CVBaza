/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@/db";
import { findUserByEmail } from "@/resources/user-queries";
import { User } from "@/types/db";

import { verifyPassword } from "../utils/password";

const authOptions = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      //@ts-ignore
      async authorize(
        credentials: Record<"email" | "password", string | undefined>
      ): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        const user = await findUserByEmail(credentials.email);

        if (!user) {
          throw new Error("Account not found. Please sign up or try a different email.");
        }

        if (!user.password) {
          throw new Error("OAuthAccountNotLinked");
        }

        const isCorrectPassword = await verifyPassword(credentials.password, user.password);

        if (!isCorrectPassword) {
          throw new Error("InvalidCredentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
          image: user.image,
          password: user.password,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account || !user.email) return false;

      // For credentials login, always allow
      if (account.provider === "credentials") {
        return true;
      }

      // For OAuth providers, check if user exists
      const existingUser = await findUserByEmail(user.email);

      // If no existing user, allow sign up
      if (!existingUser) {
        return true;
      }

      // If user exists with credentials, don't allow OAuth
      if (existingUser.password) {
        // Use default locale, the middleware will handle the redirect
        return `/en/auth/signin?error=UseCredentials&email=${encodeURIComponent(user.email)}`;
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name ?? null;
        session.user.email = token.email;
        session.user.image = token.picture ?? null;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }

      if (user) {
        const typedUser = user as User;
        return {
          ...token,
          id: typedUser.id,
          name: typedUser.name ?? null,
          email: typedUser.email,
          picture: typedUser.image ?? null,
        };
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/en/auth/signin",
    error: "/en/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = authOptions;
