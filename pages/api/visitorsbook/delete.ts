/**
 * 방명록 삭제 서버 요청
 */

import { connectDB } from "@/utils/database";
import { UserDataProps } from "@/utils/interface/user/userInterfaces";
import { VisitorsBookProps, VisitorsBookRequestProps } from "@/utils/interface/visitorsBook/visitorsbookInterfaces";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await connectDB;
    const db = client.db("simplepage");
    const body = JSON.parse(req.body);

    const item = await db.collection("visitorsbook").findOne({ _id: new ObjectId(body._id) });

    if (item.authtype) {
      if (item.writerid === body.userid) {
        await db.collection("visitorsbook").deleteOne({ _id: new ObjectId(body._id) });
      } else {
        return res.redirect(500, "/visitorsBook");
      }
    } else {
      if (item.bookpassword === body.bookpassword) {
        await db.collection("visitorsbook").deleteOne({ _id: new ObjectId(body._id) });
      } else {
        return res.redirect(500, "/visitorsBook");
      }
    }
    res.redirect(302, "/visitorsBook");
  } catch (e) {
    console.error(e + "서버요청 오류 발생");
  }
};

export default handler;
