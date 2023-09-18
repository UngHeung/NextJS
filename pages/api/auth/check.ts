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
    console.log(e + "서버요청 오류 발생");
  }
};

export default handler;
