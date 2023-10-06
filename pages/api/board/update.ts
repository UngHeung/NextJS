/**
 * 게시물 업데이트 서버 요청
 */

import getDbCollection from "../getDatabase";
import { PostProps } from "@/utils/interface/board/boardInterfaces";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as PostProps;

  try {
    await (
      await getDbCollection("board")
    ).updateOne(
      { _id: new ObjectId(body._id) },
      {
        $set: {
          title: body.title,
          content: body.content,
        },
      }
    );

    res.redirect(302, `/board/detail/${body._id}`);
  } catch (e) {
    throw new Error("board_update_서버요청 오류 발생\n" + e);
  }
};

export default handler;
