import Header from "./layout/Header";
import Footer from "./layout/Footer";
import NextAuthProvider from "./providers/NextAuthProvider";
import type { Metadata } from "next";
import "./globals.css";
import "./layout.css";
import { RecoilRoot } from "recoil";

export const metadata: Metadata = {
  title: "NextJS",
  description: "Next.js 실습",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <NextAuthProvider>
          <RecoilRoot>
            <Header />
            <main className="main">{children}</main>
            <Footer />
          </RecoilRoot>
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
