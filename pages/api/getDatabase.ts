import { connectDB } from "@/utils/database";

const getDB = async () => {
  const client = await connectDB;
  const db = client.db("simplepage");
  return db;
};

export default getDB;
