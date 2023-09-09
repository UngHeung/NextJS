/**
 * 게시판 페이지
 */

import Link from "next/link";
import React from "react";
import "./page.css";
import { connectDB } from "@/utils/database";

export interface boardProps {
  _id: string;
  no: string;
  writer: string;
  title: string;
  content: string;
  date: string;
}

const newPage = async () => {
  const client = await connectDB;
  const db = client.db("simplepage");
  const boardList: boardProps[] = await db.collection("board").find().toArray();

  return (
    <>
      <section className="board-wrap">
        <h3 className="title">게시판</h3>
        <ul className="board-list">
          {boardList.reverse().map((item) => {
            return (
              <li key={item._id}>
                <Link href={`/board/${item._id}`}>
                  <section className="board-head">
                    <span className="board-no">{item.no}</span>
                    <strong className="board-title">{item.title}</strong>
                    <span className="board-writer">{item.writer}</span>
                  </section>
                  <section className="board-main">
                    <p className="board-content">{item.content}</p>
                  </section>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default newPage;
