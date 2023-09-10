"use client";

import { connectDB } from "@/utils/database";
import React from "react";

const postWrite = () => {
  const handleSubmit = async () => {
    const client = await connectDB;
    const db = client.db("simplepage");
    const no: number = (await db.collection("board").find().toArray().length) - 1;

    return no;
  };
  const writer = "관리자";

  return (
    <>
      <main className="board-write-main">
        <h3 className="title">글쓰기</h3>
        <header className="board-write-head">
          <input type="text" className="board-write-title" />
        </header>
      </main>
    </>
  );
};

export default postWrite;
