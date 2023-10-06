import getDbCollection from "../getDatabase";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if ((await (await getDbCollection("userauth")).findOne({ email: req.body })) || null) {
      res.redirect(500, "/userAuth/signUp");
    } else {
      res.redirect(302, "/userAuth/signUp");
    }
  } catch (e) {
    throw new Error("api/auth/check.ts_서버 문제 발생\n" + e);
  }
};

export default handler;
