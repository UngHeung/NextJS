/**
 * 회원가입 서버 요청
 */

import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.email) {
    res.redirect(500, "/userAuth"); // 아이디 미입력
    return;
  } else if (!req.body.password) {
    res.redirect(500, "/userAuth"); // 비밀번호 미입력
    return;
  }

  try {
    const client = await connectDB;
    const db = client.db("simplepage");

    await db.collection("userauth").insertOne(req.body);
    res.redirect(302, "/userAuth");
  } catch (e) {
    console.log(e + "서버요청 오류 발생");
  }
};

export default handler;
