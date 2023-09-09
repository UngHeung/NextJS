import { MongoClient } from "mongodb";
import ADMIN from "./config";

const url = `mongodb+srv://admin:${ADMIN.PW}@test-project.mmw6miq.mongodb.net/?retryWrites=true&w=majority`;

let connectDB: any;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect();
  }

  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url).connect();
}

export { connectDB };
