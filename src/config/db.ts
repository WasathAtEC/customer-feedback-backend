import { MONGO_URI } from "./../../env";
import mongoose from "mongoose";

const connect = async () => {
  const uri = MONGO_URI;

  const db = await mongoose.connect(uri);
  console.log("Connected to database");

  return db;
};

export { connect };
