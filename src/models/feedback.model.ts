import { IssueCategories } from "../enums/issueCategories";
import { company } from "../enums/company";
import mongoose from "mongoose";

const feedbackScheema = new mongoose.Schema({
  time: {
    type: String,
    required: [true, "Time is required!"],
  },

  date: {
    type: String,
    required: [true, "Date is required!"],
  },

  company: {
    type: String,
    enum: Object.values(company),
    required: [true, "Company is required!"],
  },

  issueCategory: {
    type: String,
    enum: Object.values(IssueCategories),
    required: [true, "Issue category is required!"],
  },

  name: {
    type: String,
    required: [true, "Name is required!"],
  },

  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: false,
    trim: true,
    lowercase: true,
  },

  subject: {
    type: String,
    required: [true, "Subject is required!"],
  },

  message: {
    type: String,
    required: [true, "Message is required!"],
  },

  imageUrl: {
    type: String,
  },

  ticket: {
    type: String,
    required: [true, "Ticket generation failed!"],
  },

  isFixed: {
    type: Boolean,
    default: false,
  }
});

export default mongoose.model("Feedback", feedbackScheema);
