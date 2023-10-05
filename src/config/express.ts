import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import v1 from "../api/routes/v1";

dotenv.config();

const app = express();

// log requests -> dev: console || prod : file
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// mount routes
app.use("/api/v1", v1);

export { app };
