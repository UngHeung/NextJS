import Link from "next/link";
import React from "react";
import logo from "@/public/assets/logo-dark.svg";
import Image from "next/image";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import { getServerSession } from "next-auth/next";

const Header = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSessionProps;

  return (
    <header className="main-header">
      <div className="main-header-wrap">
        <h2>
          <Link href={"/"}>
            <Image src={logo} alt="로고" width={45} />
          </Link>
        </h2>
        <nav className="main-nav">
          <ul className="main-menu">
            <li>
              <Link href={"/board"}>게시판</Link>
            </li>
            <li>
              <Link href={"/visitorsBook"}>방명록</Link>
            </li>
            <li>
              {!user ? (
                <Link href={"/userAuth"}>로그인</Link>
              ) : (
                <Link href={"/userAuth/userInfo/"}>{user.accountname}</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
