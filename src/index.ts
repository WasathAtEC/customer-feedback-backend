import { app } from "./config/express";
import { connect } from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const HOST = process.env.HOST!;
const PORT = parseInt(process.env.PORT!);

connect();

app.listen(PORT, HOST, () => {
  console.log(`Backend is running on http://${HOST}:${PORT}`);
});

