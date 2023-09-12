/**
 * 회원가입 서버 요청
 */

import { connectDB } from "@/utils/database";
// import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.body.email) {
      return res.status(500).json("아이디 미입력");
    } else if (!req.body.password) {
      return res.status(500).json("비밀번호 미입력");
    }
    // // const hash = await bcrypt.hash(req.body.password, 10);
    // req.body.password = hash;

    const client = await connectDB;
    const db = client.db("simplepage");

    await db.collection("userauth").insertOne(req.body);
    // res.status(200).json("성공");
    res.redirect(302, "/userAuth");
  }
};

export default handler;
