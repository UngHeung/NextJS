import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = JSON.parse(req.body);

  if (!body) {
    res.redirect(500, "/userAuth/signUp");
  }

  try {
    const client = await connectDB;
    const db = client.db("simplepage");
    if (await db.collection("userauth").findOne({ email: body })) {
      res.redirect(500, "/userAuth/signUp");
      return;
    }

    res.redirect(302, "/userAuth/signUp");
  } catch (e) {
    console.log(e + "서버요청 오류 발생");
  }
};

export default handler;
