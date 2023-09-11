/**
 * 방명록 작성 서버 요청
 */

import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.writer) {
    return res.status(500).json("작성자명이 없습니다.");
  } else if (!req.body.content) {
    return res.status(500).json("내용이 없습니다.");
  }

  try {
    const client = await connectDB;
    const db = client.db("simplepage");

    await db.collection("visitorsbook").insertOne(req.body);
    res.redirect(302, "/visitorsBook");
  } catch (e) {
    console.error(e);
  }
};

export default handler;
