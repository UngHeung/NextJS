/**
 * 댓글 삭제 서버 요청
 */

import getDbCollection from "../getDatabase";
import { CommentProps } from "@/app/components/comment/Form";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as CommentProps;
  try {
    await (await getDbCollection("comment")).deleteOne({ _id: new ObjectId(body._id) });

    res.redirect(302, `/board/detail/${body.postid}`);
  } catch (e) {
    console.error("board_delete_서버요청 오류 발생\n" + e);
  }
};

export default handler;
