/**
 * 게시물 작성 서버 요청
 */

import { connectDB } from "@/utils/database";
import { PostProps } from "@/utils/interface/board/boardInterfaces";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body: PostProps = JSON.parse(req.body);

  if (!body.title) {
    return res.status(500).json("제목이 없습니다.");
  } else if (!body.content) {
    return res.status(500).json("내용이 없습니다.");
  }

  try {
    const client = await connectDB;
    const db = client.db("simplepage");
    await db.collection("board").insertOne(body);

    res.redirect(302, "/board");
  } catch (e) {
    console.error(e + "서버요청 오류 발생");
  }
};

export default handler;
