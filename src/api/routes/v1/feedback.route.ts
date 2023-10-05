import express from "express";
import { test, createFeedback } from "../../controller/feedback.controller";

const router = express.Router();

// http://localhost:3000/api/v1/feedback/test
router.get("/test", test);
router.post("/create-feedback", createFeedback);

export default router;
