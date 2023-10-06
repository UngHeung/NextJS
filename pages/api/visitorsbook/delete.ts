/**
 * 방명록 삭제 서버 요청
 */

import getDbCollection from "../getDatabase";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const dbCollection = await await getDbCollection("visitorsbook");
    const body = req.body;

    const item = await dbCollection.findOne({ _id: new ObjectId(body._id) });

    if (item.writerid === body.userid || item.bookpassword === body.bookpassword) {
      await dbCollection.deleteOne({ _id: new ObjectId(body._id) });
    } else {
      return res.redirect(500, "/visitorsBook");
    }

    res.redirect(302, "/visitorsBook");
  } catch (e) {
    throw new Error("api/visitorsbook/delete.ts\n" + e);
  }
};

export default handler;
