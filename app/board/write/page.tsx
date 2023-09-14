/**
 * 글쓰기 페이지
 */

import React from "react";
import Form from "../common/Form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { UserDataProps, UserSessionProps } from "@/utils/interface/user/userInterfaces";
import "../page.css";

const postWrite = async () => {
  let session;
  let user = {} as UserSessionProps;

  try {
    session = await getServerSession(authOptions);
    user = session?.user as UserSessionProps;
  } catch (e) {
    console.log(e + "서버에 문제 발생");
  }
  if (!user) {
    redirect("/userAuth");
  }

  return (
    <>
      <main className="board-write-main">
        <h3 className="title">글쓰기</h3>
        <header className="board-write-head">
          <Form type="write" userData={user} />
        </header>
      </main>
    </>
  );
};

export default postWrite;
