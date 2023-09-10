/**
 * 게시물 업데이트 서버 요청
 */

import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.title) {
    console.log("제목이 없음");
    return res.status(500).json("제목이 없습니다.");
  } else if (!req.body.content) {
    console.log("내용이 없음");
    return res.status(500).json("내용이 없습니다.");
  }

  const client = await connectDB;
  const db = client.db("simplepage");
  await db.collection("board").updateOne(
    { _id: new ObjectId(req.body._id) },
    {
      $set: {
        title: req.body.title,
        content: req.body.content,
      },
    }
  );

  res.redirect(302, `/board/detail/${req.body._id}`);
};

export default handler;
