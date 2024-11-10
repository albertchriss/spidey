import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, {
  type DefaultSession,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google"
import { env } from "~/env"

import { db } from "~/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "~/server/db/schema";


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
      image: string;
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
    async jwt({token, user}){
      if (user?.image){
        token.image = user.image;
      }
      return token;
    },
    async session({token, session}){
      if (token.sub && session.user){
        session.user.id = token.sub
        session.user.image = token.image as string;
      }
      
      return session;
    },
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
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  
});
