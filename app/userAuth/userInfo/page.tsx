import React from "react";
import LogoutButton from "../login/LogoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import "./page.css";

const pages = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <>
      <section className="user-info-wrap">
        <h3 className="title">회원정보</h3>
        <div>
          <h4 className="info-title">계정이름</h4>
          <span className="info-value">{user?.name}</span>
        </div>
        <div>
          <h4 className="info-title">이메일</h4>
          <strong className="info-value">{user?.email}</strong>
        </div>
      </section>
      <section className="user-info-button-wrap">
        <button className="button btn-normal">수정</button>
        <LogoutButton />
      </section>
    </>
  );
};

export default pages;
