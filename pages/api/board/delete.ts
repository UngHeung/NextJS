/**
 * 게시물 삭제 서버 요청
 */

import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await connectDB;
    const db = client.db("simplepage");
    await db.collection("board").deleteOne({ _id: new ObjectId(req.body) });
    res.redirect(302, "/board");
  } catch (e) {
    console.error(e);
  }
};

export default handler;
