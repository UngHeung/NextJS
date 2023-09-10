/**
 *
 * @param req 요청
 * @param res 응답
 * @returns 상태
 *
 * 성공 200
 * 실패 500
 */

import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDB;
  const db = client.db("simplepage");
  let result;

  if (req.method === "GET") {
    result = await db.collection("board").find().toArray();
  } else if (req.method === "POST") {
    if (req.body.title === "") {
      console.log("제모깅 없슴");
      return res.status(500).json("제목이 없습니다.");
    } else if (req.body.content === "") {
      return res.status(500).json("내용이 없습니다.");
    }
    await db.collection("board").insertOne(req.body);
    res.redirect(302, "/board");
    return;
  }

  console.log(result);
  return result;
};

export default handler;
