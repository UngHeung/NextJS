"use client";

import Link from "next/link";
import React from "react";
import logo from "@/public/assets/logo-dark.svg";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { loginUser } from "@/recoil/atoms";

const Header = () => {
  const user = useRecoilValue(loginUser);

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
              <Link href={"/readMe"}>리드미</Link>
            </li>
            <li>
              <Link href={"/board"}>게시판</Link>
            </li>
            <li>
              <Link href={"/visitorsBook"}>방명록</Link>
            </li>
            <li>
              {!user.userid ? (
                <Link href={"/userAuth"}>로그인</Link>
              ) : (
                <Link href={"/userAuth/userInfo/"} className="user-login">
                  {user.accountname}
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
