/**
 * 글쓰기 페이지
 */

"use client";

import React from "react";
import Form from "../common/Form";
import { redirect } from "next/navigation";
import { useRecoilValue } from "recoil";
import { loginUser } from "@/recoil/atoms";
import "../page.css";

const PostWrite = () => {
  const user = useRecoilValue(loginUser);

  if (!user.accountname) {
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

export default PostWrite;
