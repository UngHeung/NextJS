import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(500).json("이메일 미입력");
    }

    const client = await connectDB;
    const db = client.db("simplepage");
    if (await db.collection("userauth").findOne({ email: req.body })) {
      return res.status(500).json("이미 가입된 이메일");
    }

    return res.status(200).json("가입 가능한 이메일");
  }
};

export default handler;
