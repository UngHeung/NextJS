/**
 * 게시물 업데이트 서버 요청
 */

import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  const postId = body._id;

  if (!body.title) {
    return res.status(500).json("제목이 없습니다.");
  } else if (!body.content) {
    return res.status(500).json("내용이 없습니다.");
  }

  try {
    const client = await connectDB;
    const db = client.db("simplepage");
    await db.collection("board").updateOne(
      { _id: new ObjectId(postId) },
      {
        $set: {
          title: body.title,
          content: body.content,
        },
      }
    );

    res.redirect(302, `/board/detail/${postId}`);
  } catch (e) {
    console.error(e + "서버 에러");
  }
};

export default handler;
