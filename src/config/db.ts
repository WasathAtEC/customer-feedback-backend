import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection failed ${err}`);
  process.exit(-1);
});

const connect = (): Connection => {
  mongoose
    .connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions) 
    .then(() => {
      console.log("Database connected successfully!");
    });
  return mongoose.connection;
};

export { connect };
