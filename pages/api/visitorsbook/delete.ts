/**
 * 방명록 삭제 서버 요청
 */

import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await connectDB;
    const db = client.db("simplepage");
    const body = JSON.parse(req.body);

    const item = await db.collection("visitorsbook").findOne({ _id: new ObjectId(body._id) });

    if (item.authtype) {
      if (item.writerid === body.userdata._id) {
        await db.collection("visitorsbook").deleteOne({ _id: new ObjectId(body._id) });
        return res.status(200).json("성공");
      }
    } else {
      if (item.bookpassword === body.bookpassword) {
        await db.collection("visitorsbook").deleteOne({ _id: new ObjectId(body._id) });
        return res.status(200).json("성공");
      }
    }

    return res.status(500).json("실패");
  } catch (e) {
    console.error(e);
  }
};

export default handler;
