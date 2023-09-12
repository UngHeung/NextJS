import { OAUTH } from "@/utils/authConfig";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/utils/database";
import { NextAuthOptions, User } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: OAUTH.GITHUB.ID,
      clientSecret: OAUTH.GITHUB.PW,
    }),
    CredentialsProvider({
      name: "",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const client = await connectDB;
        const db = client.db("simplepage");
        const user = await db.collection("userauth").findOne({ email: credentials?.email });
        console.log(user);

        if (!user) {
          console.log("이메일 없음");
          return null;
        }

        if (!credentials?.password === user.password) {
          console.log("잘못된 비밀번호");
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },

    session: async ({ session, token }: any) => {
      session.user = token.user;
      return session;
    },
  },

  adapter: MongoDBAdapter(connectDB),
  secret: OAUTH.SECRET,
};

export default NextAuth(authOptions);
