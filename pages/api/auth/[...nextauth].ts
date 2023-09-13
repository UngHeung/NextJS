import { OAUTH } from "@/utils/authConfig";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/utils/database";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    // GithubProvider({
    //   clientId: OAUTH.GITHUB.ID,
    //   clientSecret: OAUTH.GITHUB.PW,
    // }),
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

        if (!user) {
          console.log("가입되지 않은 이메일");
          return null;
        }

        if (credentials?.password !== user.password) {
          console.log("잘못된 비밀번호");
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60,
    maxAge: 60 * 60,
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

  pages: {
    signIn: "/userAuth",
  },

  secret: OAUTH.SECRET,
};

export default NextAuth(authOptions);
