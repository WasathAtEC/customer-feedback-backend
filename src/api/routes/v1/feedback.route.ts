import express from "express";
import {
  test,
  createFeedback,
  getAllFeedbacks,
  getFilteredFeedbacksByIssueCategory,
  replyFeedback,
} from "../../controller/feedback.controller";
import { Auth } from "../../middleware/auth";

const router = express.Router();

// http://localhost:3000/api/v1/feedback/test
router.get("/test", test);
router.post("/create-feedback", createFeedback);
router.get("/get-all-feedbacks", Auth, getAllFeedbacks);
router.get(
  "/get-feedbacks-by-issue/:issueCategory",
  Auth,
  getFilteredFeedbacksByIssueCategory
);
router.post("/reply-feedback/:id", Auth, replyFeedback);

export default router;
