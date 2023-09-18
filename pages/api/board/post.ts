/**
 * 게시물 작성 서버 요청
 */

import getDbCollection from "../getDatabase";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;

  try {
    const newPost = await (await getDbCollection("board")).insertOne(body);

    res.redirect(302, `/board/detail/${newPost.insertedId}`);
  } catch (e) {
    console.error("board_post_서버요청 오류 발생\n" + e);
  }
};

export default handler;
