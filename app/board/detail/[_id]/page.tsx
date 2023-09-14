/**
 * 게시물 상세 페이지
 */

import { connectDB } from "@/utils/database";
import React from "react";
import { ObjectId } from "mongodb";
import "./page.css";
import Link from "next/link";
import { PostProps } from "@/utils/interface/board/boardInterface";
import Button from "../../delete/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { userProps } from "../../common/Form";

const postDetail = async ({ ...props }: { params: PostProps }) => {
  const client = await connectDB;
  const db = client.db("simplepage");
  const detail: PostProps = await db.collection("board").findOne({ _id: new ObjectId(props.params._id) });
  const session = await getServerSession(authOptions);
  const user = session?.user as userProps;

  return (
    <>
      <main className="board-detail-main">
        <header className="board-detail-head">
          {/* <span className="board-detail-no">{detail?.no}</span> */}
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
          <Link className="button btn-normal" href={"/board"}>
            목록
          </Link>
          {user?._id === detail?.writerid ? (
            <>
              <Link className="button btn-normal" href={`/board/update/${detail?._id}`}>
                수정
              </Link>
              <Button _id={detail?._id} req="board" />
            </>
          ) : null}
        </section>
      </main>
    </>
  );
};

export default postDetail;
