import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, {
  type DefaultSession,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import authConfig from "./auth.config"

import { db } from "~/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "~/server/db/schema";

import { api } from "~/trpc/server"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({token, session}){
      if (token.sub && session.user){
        session.user.id = token.sub
      }
      return session;
    },

    // async jwt ({ token }){
    //   if (!token.sub) return token;

    //   const existingUser = await api.user.getUserById(token.sub);

    //   if (!existingUser) return token;

    //   return token;

    // }
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  session:{
    strategy : "jwt",
  },
  ...authConfig
  
});
