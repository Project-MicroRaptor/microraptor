import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const clientId = process.env.AUTH0_CLIENT_ID;
const clientSecret = process.env.AUTH0_CLIENT_SECRET;
const issuer = process.env.AUTH0_ISSUER_BASE_URL;

if (!clientId) throw "COGNITO_CLIENT_ID is undefined";
if (!clientSecret) throw "COGNITO_CLIENT_SECRET is undefined";
if (!issuer) throw "COGNITO_ISSUER is undefined";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId,
      clientSecret,
      issuer,
    }),
  ],
  debug: process.env.NODE_ENV === "development" ? true : false,
  callbacks: {
    session: async({session, user}) => {
      session.user.id = user.id
      return Promise.resolve(session);
    }
  }
};

export default NextAuth(authOptions);
