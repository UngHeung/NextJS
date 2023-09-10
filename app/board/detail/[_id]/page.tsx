/**
 * 게시물 상세 페이지
 */

import { connectDB } from "@/utils/database";
import React, { useState } from "react";
import { ObjectId } from "mongodb";
import "./page.css";
import Link from "next/link";
import { PostProps } from "@/utils/interface/boardInterface";

const postDetail = async ({ ...props }: { params: PostProps }) => {
  const client = await connectDB;
  const db = client.db("simplepage");
  const detail: PostProps = await db.collection("board").findOne({ _id: new ObjectId(props.params._id) });

  return (
    <>
      <main className="board-detail-main">
        <header className="board-detail-head">
          <span className="board-detail-no">{detail?.no}</span>
          <h3 className="board-detail-title">{detail?.title}</h3>
          <span className="board-detail-writer">{detail?.writer}</span>
        </header>
        <p className="board-detail-content">{detail?.content}</p>
        <input type="checkbox" name="board-like" id="board_detail_like" />
        <label htmlFor="board_detail_like">
          <span>{}</span>
          <span>{detail?.like.length}</span>
        </label>
        <Link href={"/board"}>목록보기</Link>
      </main>
    </>
  );
};

export default postDetail;
