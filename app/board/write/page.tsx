/**
 * 글쓰기 페이지
 */

"use client";

import React, { useEffect } from "react";
import Form from "../common/Form";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginUser, modalData } from "@/recoil/atoms";
import "../page.css";

const PostWrite = () => {
  const user = useRecoilValue(loginUser);
  const [modal, setModal] = useRecoilState(modalData);

  useEffect(() => {
    !user.userid &&
      setModal({
        type: "primary",
        title: "회원 전용",
        message: "로그인이 필요합니다.",
        url: "/userAuth",
        isShow: true,
      });
  }, []);

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
