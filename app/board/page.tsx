/**
 * 게시판 페이지
 */

import Link from "next/link";
import React from "react";
import "./page.css";
import { connectDB } from "@/utils/database";
import { PostProps } from "@/utils/interface/boardInterface";

export const dynamic = "force-dynamic";

const postList = async () => {
  const client = await connectDB;
  const db = client.db("simplepage");
  const boardList: PostProps[] = await db.collection("board").find().toArray();

  return (
    <>
      <section className="board-wrap">
        <h3 className="title">게시판</h3>
        <ul className="board-list">
          {boardList.map((item) => {
            return (
              <li key={item?._id}>
                <Link href={`/board/detail/${item?._id}`}>
                  <section className="board-head">
                    {/* <span className="board-no">{item?.no}</span> */}
                    <strong className="board-title">{item?.title}</strong>
                    <span className="board-writer">{item?.writer}</span>
                  </section>
                  <section className="board-main">
                    <p className="board-content">{item?.content}</p>
                    <span className="board-like">{item?.like.length}</span>
                  </section>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link className="button btn-normal board-write" href={"board/write/"}>
          작성하기
        </Link>
      </section>
    </>
  );
};

export default postList;
