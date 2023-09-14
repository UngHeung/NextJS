/**
 * 게시물 삭제 서버 요청
 */

import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);
  try {
    const client = await connectDB;
    const db = client.db("simplepage");
    await db.collection("board").deleteOne({ _id: new ObjectId(body._id) });

    res.redirect(302, "/board");
  } catch (e) {
    console.error(e + "서버요청 오류 발생");
  }
};

export default handler;
