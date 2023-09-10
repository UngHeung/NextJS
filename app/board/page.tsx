/**
 * 게시판 페이지
 */

import Link from "next/link";
import React from "react";
import "./page.css";
import { connectDB } from "@/utils/database";
import { PostProps } from "@/utils/interface/boardInterface";

const postList = async () => {
  const client = await connectDB;
  const db = client.db("simplepage");
  const boardList: PostProps[] = await db.collection("board").find().toArray();

  return (
    <>
      <section className="board-wrap">
        <h3 className="title">게시판</h3>
        <ul className="board-list">
          {boardList.reverse().map((item) => {
            return (
              <li key={item._id}>
                <Link href={`/board/detail/${item._id}`}>
                  <section className="board-head">
                    <span className="board-no">{item.no}</span>
                    <strong className="board-title">{item.title}</strong>
                    <span className="board-writer">{item.writer}</span>
                  </section>
                  <section className="board-main">
                    <p className="board-content">{item.content}</p>
                    <span className="board-like">👍{item.likecount}</span>
                  </section>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href={"board/write/"}>글쓰기</Link>
      </section>
    </>
  );
};

export default postList;
