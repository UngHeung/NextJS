import React from "react";
import LogoutButton from "../login/LogoutButton";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import "./page.css";

const pages = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSessionProps;

  if (!user) {
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
