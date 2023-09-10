import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./layout.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS",
  description: "Next.js 실습",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko-KR">
      <body className={inter.className}>
        <header className="main-header">
          <div className="main-header-wrap">
            <h2>
              <Link href={"/"}>NEXT.JS</Link>
            </h2>
            <nav className="main-nav">
              <ul className="main-menu">
                <li>
                  <Link href={"/board"}>게시판</Link>
                </li>
                <li>
                  <Link href={"/visitorsBook"}>방명록</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="main">{children}</main>
        <footer className="main-footer">
          <div className="main-footer-wrap">
            <h2>Next.js 연습하기</h2>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
