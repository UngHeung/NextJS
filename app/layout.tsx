import Header from "./layout/Header";
import Footer from "./layout/Footer";
import NextAuthProvider from "./providers/NextAuthProvider";
import Recoil from "./components/recoil/Recoil";
import type { Metadata } from "next";
import "./globals.css";
import "./layout.css";

export const metadata: Metadata = {
  title: "NextJS",
  description: "Next.js 실습",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <NextAuthProvider>
          <Recoil>
            <Header />
            <main className="main">{children}</main>
            <Footer />
          </Recoil>
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
