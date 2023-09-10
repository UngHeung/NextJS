/**
 * 게시물 작성 서버 요청
 */

import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.title) {
    console.log("제모깅 없슴");
    return res.status(500).json("제목이 없습니다.");
  } else if (!req.body.content) {
    return res.status(500).json("내용이 없습니다.");
  }

  const client = await connectDB;
  const db = client.db("simplepage");

  req.body.writer = "관리자";
  req.body.like = [];

  const result = await db.collection("board").insertOne(req.body);
  res.redirect(302, "/board");
};

export default handler;
