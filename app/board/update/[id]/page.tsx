import { connectDB } from "@/utils/database";
import React from "react";
import Form from "../../common/Form";
import { ObjectId } from "mongodb";
import { PostProps } from "@/utils/interface/boardInterface";

const postUpdate = async ({ ...props }: { params: PostProps }) => {
  const writer = "관리자";
  console.log(props.params);

  const client = await connectDB;
  const db = client.db("simplepage");
  const data = await db.collection("board").findOne({ _id: new ObjectId(props.params.id) });
  data._id = props.params.id;

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
