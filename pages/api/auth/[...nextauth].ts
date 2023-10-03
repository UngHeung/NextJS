import NextAuth from "next-auth/next";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import getDbCollection from "../getDatabase";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentails",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await (await getDbCollection("userauth")).findOne({ email: credentials?.email });

        if (!user) {
          console.log("가입되지 않은 이메일");
          return;
        }

        const inputPassword = credentials?.password as string;
        const comparePassword = user.password;
        const validateLogin = await bcrypt.compare(inputPassword, comparePassword);

        if (!validateLogin) {
          console.log("잘못된 비밀번호");
          return;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 10 * 60,
  },

  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.user = {};
        token.user.userid = user._id;
        token.user.accountname = user.accountname;
        token.user.email = user.email;
        token.user.admin = user.admin;
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

  secret: process.env.OAUTH_SECRET,
};

export default NextAuth(authOptions);
