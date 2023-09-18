/**
 * 게시판 페이지
 */

import Link from "next/link";
import React from "react";
import getDbCollection from "@/pages/api/getDatabase";
import { PostProps } from "@/utils/interface/board/boardInterfaces";
import { redirect } from "next/navigation";
import "./page.css";

export const dynamic = "force-dynamic";

const postList = async () => {
  let boardList: PostProps[];

  try {
    boardList = await (await getDbCollection("board")).find().sort({ _id: -1 }).toArray();
  } catch (e) {
    console.error("board_서버에 문제 발생\n" + e);
    redirect("/board");
  }

  return (
    <>
      <section className="board-wrap">
        <h3 className="title">게시판</h3>
        <ul className="board-list">
          {boardList.map((item) => {
            item._id = item._id.toString();
            return (
              <li key={item?._id}>
                <Link href={`/board/detail/${item?._id}`}>
                  <section className="board-head">
                    <strong className="board-title">{item?.title}</strong>
                    <span className="board-writer">{item?.writer}</span>
                  </section>
                  <section className="board-main">
                    <p className="board-content">{item?.content}</p>
                    {/* <span className="board-like">{item?.like.length}</span> */}
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
