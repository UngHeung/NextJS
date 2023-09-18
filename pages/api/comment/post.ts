/**
 * 댓글 작성 서버 요청
 */

import getDbCollection from "../getDatabase";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;

  try {
    await (await getDbCollection("comment")).insertOne(body);

    res.redirect(302, `/board/detail/${body.postid}`);
  } catch (e) {
    console.error("comment_post_서버요청 오류 발생\n" + e);
  }
};

export default handler;
