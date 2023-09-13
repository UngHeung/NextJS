/**
 * 글쓰기 페이지
 */

import { connectDB } from "@/utils/database";
import React from "react";
import Form, { userProps } from "../common/Form";
import "../page.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

const postWrite = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as userProps;
  if (!user) {
    redirect("/userAuth");
  }

  console.log(session?.user);
  const writer = "관리자";
  let no: number;
  const handleSubmit = async () => {
    const client = await connectDB;
    const db = client.db("simplepage");
    no = (await db.collection("board").find().toArray().length) - 1;
  };

  return (
    <>
      <main className="board-write-main">
        <h3 className="title">글쓰기</h3>
        <header className="board-write-head">
          <Form type="write" userdata={user} />
        </header>
      </main>
    </>
  );
};

export default postWrite;
