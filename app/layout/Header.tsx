"use client";

import Link from "next/link";
import React from "react";

const Header = ({ ...props }) => {
  const user = props?.user;

  return (
    <header className="main-header">
      <div className="main-header-wrap">
        <h2>
          <Link href={"/"}>DEV.</Link>
        </h2>
        <nav className="main-nav">
          <ul className="main-menu">
            <li>
              <Link href={"/board"}>게시판</Link>
            </li>
            <li>
              <Link href={"/visitorsBook"}>방명록</Link>
            </li>
            <li>{!user ? <Link href={"./userAuth"}>로그인</Link> : <span>{user.name}</span>}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
