import type { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";
import credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { LoginSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { db } from "./lib/db";
import { users } from "./lib/schema";
import { eq } from "drizzle-orm";

const adapter = DrizzleAdapter(db);

const authConfig: NextAuthConfig = {
  // debug: true,
  adapter,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate the credentials using the LoginSchema
        const result = LoginSchema.safeParse(credentials);

        if (!result.success) {
          return null;
        }

        const { email, password } = result.data;

        const userResults = await db
          .select({
            id: users.id,
            email: users.email,
            name: users.name,
            password: users.password,
          })
          .from(users)
          .where(eq(users.email, email));

        const user = userResults[0];

        if (!user || !user.password) {
          return null;
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  events: {
    async linkAccount({ user }) {
      if (user?.id) {
        // Check if user.id exists
        await db
          .update(users)
          .set({ emailVerified: new Date() })
          .where(eq(users.id, user.id));
      } else {
        throw new Error("User ID is undefined");
      }
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        return true;
      }
      return true;
    },

    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      if (pathname.startsWith("/auth") && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }

      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub ?? "";
        if (token.email && typeof token.email === "string") {
          session.user.email = token.email;
        }
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
  secret: process.env.AUTH_SECRET!,
};

export default authConfig;
