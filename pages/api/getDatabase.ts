/**
 * database collection
 * @param collection
 */

import { connectDB } from "@/utils/database";

const getDbCollection = async (collection: string) => {
  try {
    const client = await connectDB;
    const db = client.db("simplepage");
    const result = await db.collection(collection);
    return result;
  } catch (e) {
    throw new Error("getDatabase_서버에서 문제 발생\n" + e);
  }
};

export default getDbCollection;
