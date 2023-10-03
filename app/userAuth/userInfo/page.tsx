/**
 * 유저 정보 페이지
 */

"use client";

import React from "react";
import LogoutButton from "../login/LogoutButton";
import Link from "next/link";
import { redirect } from "next/navigation";
import { loginUser } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";
import "./page.css";

const pages = () => {
  const user = useRecoilValue(loginUser);

  if (!user.accountname) {
    redirect("/");
  }

  return (
    <>
      <section className="user-info-wrap">
        <h3 className="title">회원정보</h3>
        <div>
          <h4 className="info-title">계정이름</h4>
          <span className="info-value">{user?.accountname}</span>
        </div>
        <div>
          <h4 className="info-title">이메일</h4>
          <strong className="info-value">{user?.email}</strong>
        </div>
      </section>
      <section className="user-info-button-wrap">
        <Link href={"userInfo/infoUpdate"} className="button btn-normal">
          수정
        </Link>
        <LogoutButton />
      </section>
    </>
  );
};

export default pages;
