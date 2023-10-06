/**
 * 게시물 삭제 서버 요청
 */

import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { PostProps } from "@/utils/interface/board/boardInterfaces";
import getDbCollection from "../getDatabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as PostProps;
  try {
    await (await getDbCollection("board")).deleteOne({ _id: new ObjectId(body._id) });
    await (await getDbCollection("comment")).deleteMany({ postid: body._id });

    res.redirect(302, "/board");
  } catch (e) {
    console.error("board_delete_서버요청 오류 발생\n" + e);
  }
};

export default handler;
