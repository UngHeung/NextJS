/**
 * 글쓰기 페이지
 */

import React from "react";
import Form from "../common/Form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { UserSessionProps } from "@/utils/interface/user/userInterfaces";
import "../page.css";

const postWrite = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSessionProps;

  if (!user) {
    console.log("로그인이 필요합니다.");
    redirect("/userAuth");
  }

  return (
    <>
      <main className="board-write-main">
        <h3 className="title">글쓰기</h3>
        <header className="board-write-head">
          <Form type="write" data={user} />
        </header>
      </main>
    </>
  );
};

export default postWrite;
