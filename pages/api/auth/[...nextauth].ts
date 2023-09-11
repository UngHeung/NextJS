import { OAUTH } from "@/utils/authConfig";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: OAUTH.GITHUB.ID,
      clientSecret: OAUTH.GITHUB.PW,
    }),
  ],
  secret: OAUTH.SECRET,
};

export default NextAuth(authOptions);
