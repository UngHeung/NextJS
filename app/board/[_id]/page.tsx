/**
 * 게시물 상세 페이지
 */

import { connectDB } from "@/utils/database";
import React from "react";
import { ObjectId } from "mongodb";
import "./page.css";
import Link from "next/link";
import { boardProps } from "../page";

const boardDetail = async ({ ...props }: { params: boardProps }) => {
  const client = await connectDB;
  const db = client.db("simplepage");
  const detail = await db.collection("board").findOne({ _id: new ObjectId(props.params._id) });

  return (
    <>
      <main className="board-detail-main">
        <header className="board-detail-head">
          <span className="board-detail-no">{detail?.no}</span>
          <h3 className="board-detail-title">{detail?.title}</h3>
          <span className="board-detail-writer">{detail?.writer}</span>
        </header>
        <p className="board-detail-content">{detail?.content}</p>
        <Link href={"/board"}>목록보기</Link>
      </main>
    </>
  );
};

export default boardDetail;
