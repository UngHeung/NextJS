import bcrypt from "bcryptjs";
import getDbCollection from "../getDatabase";
import { UserInfoUpdateProps } from "@/utils/interface/user/userInterfaces";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as UserInfoUpdateProps;
  const inputPassword = body.password;
  let comparePassword;

  try {
    const user = await (await getDbCollection("userauth")).findOne({ _id: new ObjectId(body._id) });
    comparePassword = user.password;
  } catch (e) {
    throw new Error("auth_update_서버 문제 발생\n" + e);
  }

  const validationPasswordCheck = await bcrypt.compare(inputPassword, comparePassword);

  if (!validationPasswordCheck) {
    console.log("잘못된 비밀번호");
    return;
  }

  try {
    if (body.updatepassword) {
      const newPassword = await bcrypt.hash(body.newpassword as string, 10);

      await (
        await getDbCollection("userauth")
      ).updateOne(
        { _id: new ObjectId(body._id) },
        {
          $set: {
            accountname: body.accountname,
            password: newPassword,
          },
        }
      );
    } else {
      await (
        await getDbCollection("userauth")
      ).updateOne(
        { _id: new ObjectId(body._id) },
        {
          $set: {
            accountname: body.accountname,
          },
        }
      );
    }

    res.redirect(302, "/userAuth/userInfo");
  } catch (e) {
    throw new Error("auth_update_서버 문제 발생2\n" + e);
  }
};

export default handler;
