import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import getDB from "../getDatabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if ((await (await getDB()).collection("userauth").findOne({ email: req.body })) || null) {
      res.redirect(500, "/userAuth/signUp");
    } else {
      res.redirect(302, "/userAuth/signUp");
    }
  } catch (e) {
    console.log(e + "서버요청 오류 발생");
  }
};

export default handler;
