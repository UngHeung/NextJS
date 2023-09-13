import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import "./layout.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import NextAuthProvider from "./providers/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS",
  description: "Next.js 실습",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  let session = await getServerSession(authOptions);

  return (
    <html lang="ko-KR">
      <body className={inter.className}>
        <Header user={session?.user} />
        <NextAuthProvider>
          <main className="main">{children}</main>
        </NextAuthProvider>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
