/**
 * 수정하기 페이지
 */

import { connectDB } from "@/utils/database";
import React from "react";
import Form from "../../common/Form";
import { ObjectId } from "mongodb";
import { PostProps } from "@/utils/interface/boardInterface";
import "../../page.css";

const postUpdate = async ({ ...props }: { params: PostProps }) => {
  const writer = "관리자";

  const client = await connectDB;
  const db = client.db("simplepage");
  const data = await db.collection("board").findOne({ _id: new ObjectId(props.params._id) });
  data._id = data._id.toString();

  return (
    <>
      <main className="board-write-main">
        <h3 className="title">수정하기</h3>
        <header className="board-write-head">
          <Form type="update" data={data} />
        </header>
      </main>
    </>
  );
};

export default postUpdate;
