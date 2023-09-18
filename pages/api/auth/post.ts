/**
 * 회원가입 서버 요청
 */

import { NextApiRequest, NextApiResponse } from "next";
import getDbCollection from "../getDatabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    (await getDbCollection("userauth")).insertOne(req.body);

    res.redirect(302, "/userAuth");
  } catch (e) {
    console.log(e + "서버요청 오류 발생");
  }
};

export default handler;
