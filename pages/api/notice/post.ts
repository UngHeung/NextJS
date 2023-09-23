import getDbCollection from "../getDatabase";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;

  try {
    await (await getDbCollection("notice")).insertOne(body);

    res.redirect(302, "/");
  } catch (e) {
    console.error("notice_post_서버요청 오류 발생\n" + e);
  }
};

export default handler;
