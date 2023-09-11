/**
 * 글쓰기 페이지
 */

import { connectDB } from "@/utils/database";
import React from "react";
import Form from "../common/Form";
import "../page.css";

const postWrite = () => {
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
          <Form type="write" />
        </header>
      </main>
    </>
  );
};

export default postWrite;
