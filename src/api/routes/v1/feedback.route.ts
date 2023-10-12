import express from "express";
import {
  test,
  createFeedback,
  getAllFeedbacks,
  replyFeedback,
  getFeedbackById,
  getFilteredFeedbacksByCompanyAndIssueCategory,
} from "../../controller/feedback.controller";
import { Auth } from "../../middleware/auth";

const router = express.Router();

// http://localhost:3000/api/v1/feedback/test
router.get("/test", test);
router.post("/create-feedback", createFeedback);
router.post("/reply-feedback/:id", Auth, replyFeedback);
router.get("/get-all-feedbacks", Auth, getAllFeedbacks);
router.get(
  "/get-feedbacks-by-company-and-issue-category",
  Auth,
  getFilteredFeedbacksByCompanyAndIssueCategory
);
router.get("/get-feedback-by-id/:id", Auth, getFeedbackById);

export default router;
