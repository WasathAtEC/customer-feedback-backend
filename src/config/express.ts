import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import v1 from "../api/routes/v1";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// mount routes
app.use("/v1", v1);

export { app };
