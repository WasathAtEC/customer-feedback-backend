import express, { Request, Response } from "express";
import feedbackRouter from "./feedback.route";
import fileServiceRouter from "./fileUpload.route";

const router = express.Router();

// http://localhost:3000/api/v1
router.get("/", (_req: Request, res: Response) => {
  res.send("Hello from backend!");
});

router.use("/feedback", feedbackRouter);
router.use("/file-service", fileServiceRouter);

export default router;
