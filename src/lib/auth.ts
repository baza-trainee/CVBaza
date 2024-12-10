/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/db";
import { findUserByEmail } from "@/resources/user-queries";
import { User } from "@/types/db";

// Password utilities
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name?: string | null;
    picture?: string | null;
  }
}

const adapter = DrizzleAdapter(db);

const authOptions = NextAuth({
  adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/[locale]/auth/signin",
    error: "/[locale]/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
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

      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }
        // @ts-ignore
        const user = await findUserByEmail(credentials.email);

        if (!user || typeof user.password !== "string") {
          throw new Error("User not found");
        }

        const isCorrectPassword = await verifyPassword(
          // @ts-ignore
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid email or password");
        }

        return user;
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
        return false;
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
});

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = authOptions;
