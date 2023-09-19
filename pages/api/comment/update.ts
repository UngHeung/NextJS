/**
 * 댓글 업데이트 서버 요청
 */

import getDbCollection from "../getDatabase";
import { CommentUpdateProps } from "@/utils/interface/comment/commentInterface";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as CommentUpdateProps;

  try {
    await (
      await getDbCollection("comment")
    ).updateOne(
      { _id: new ObjectId(body._id) },
      {
        $set: {
          comment: body.comment,
          date: body.date,
        },
      }
    );

    res.redirect(302, `/board/detail/${body.postid}`);
  } catch (e) {
    console.error("board_update_서버요청 오류 발생\n" + e);
  }
};

export default handler;
