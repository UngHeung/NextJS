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
        <section className="board-detail-content-wrap">
          <p className="board-detail-content">{detail?.content}</p>
          <input type="checkbox" name="board-like" id="board_detail_like" />
          <label className="board-detail-like" htmlFor="board_detail_like">
            <span>{`👍 ${detail?.like.length}`}</span>
          </label>
        </section>
        <section className="board-detail-link-wrap">
          <Link href={`/board/update/${detail?._id}`}>수정</Link>
          <Link href={"/board"}>목록가기</Link>
        </section>
      </main>
    </>
  );
};

export default postDetail;
