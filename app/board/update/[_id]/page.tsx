/**
 * 수정하기 페이지
 */

import { connectDB } from "@/utils/database";
import React from "react";
import Form from "../../common/Form";
import { ObjectId } from "mongodb";
import { PostProps } from "@/utils/interface/board/boardInterfaces";
import "../../page.css";
import { redirect } from "next/navigation";

const postUpdate = async ({ ...props }: { params: PostProps }) => {
  let data = {} as PostProps;

  try {
    const client = await connectDB;
    const db = client.db("simplepage");
    data = await db.collection("board").findOne({ _id: new ObjectId(props.params._id) });
    data._id = data._id.toString();
  } catch (e) {
    console.error("서버에 문제 발생");
    redirect(`/board/${props.params._id}}`);
  }

  return (
    <>
      <main className="board-write-main">
        <h3 className="title">수정하기</h3>
        <header className="board-write-head">
          <Form type="update" {...data} />
        </header>
      </main>
    </>
  );
};

export default postUpdate;
