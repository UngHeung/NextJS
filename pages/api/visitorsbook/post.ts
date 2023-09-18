/**
 * 방명록 작성 서버 요청
 */

import { NextApiRequest, NextApiResponse } from "next";
import getDbCollection from "../getDatabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;

  try {
    await (await getDbCollection("visitorsbook")).insertOne(body);

    res.redirect(302, "/visitorsBook");
  } catch (e) {
    console.error("visitorsbook_post_서버요청 오류 발생\n" + e);
  }
};

export default handler;
