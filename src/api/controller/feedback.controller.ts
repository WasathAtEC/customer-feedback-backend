import { IFeedbackInputDTO } from "types/feedback";
import Feedback from "../../models/feedback.model";
import { sendReplyEmail } from "../../utils/mailer";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

// test route
export const test = (_req: Request, res: Response) => {
  res.json({
    hello: "world",
  });
};

// create feedback
export const createFeedback = async (req: Request, res: Response) => {
  try {
    const blobUrl = process.env.BLOB_URL;
    const blobName = req.headers["blob-name"] as string;
    console.log(blobName);

    const feedbackResponse: IFeedbackInputDTO = await req.body;

    if (!feedbackResponse) {
      return res.status(400).json({ message: "Invalid request!" });
    }

    const randomTicket = Math.random().toString(36).substring(2, 15);
    feedbackResponse.ticket = randomTicket;

    if (blobName) {
      feedbackResponse.imageUrl = `${blobUrl}${blobName}`;
    }

    feedbackResponse.time = new Date().toLocaleTimeString();
    feedbackResponse.date = new Date().toLocaleDateString();

    const feedback = new Feedback(feedbackResponse);
    await feedback.save();
    console.log(feedbackResponse);
    return res
      .status(201)
      .json({ message: "Feedback created successfully!", feedback });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get filtered feedbacks by company name according to user's company
export const getAllFeedbacks = async (req: Request, res: Response) => {
  try {
    const { company } = req.user;
    const { issueCategory, date, isFixed } = req.query;

    if (company == "EC") {
      return res.status(401).json({
        message: "You are not authorized to access this data!",
      });
    }

    const query: {
      company: string;
      issueCategory?: string;
      date?: string;
      isFixed?: boolean;
    } = { company: (company as string) || "" };

    if (issueCategory) {
      query.issueCategory = issueCategory as string;
    }

    if (date) {
      query.date = date as string;
    }

    if (isFixed !== undefined) {
      query.isFixed = isFixed === "false"; 
    }

    if (isFixed !== undefined) {
      query.isFixed = isFixed === "true"; 
    }

    const feedbacks = await Promise.resolve(Feedback.find(query));
    return res.status(200).json({ feedbacks });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get filterd feedbaks by company name and issue type if user is EC category and by company name if user is not EC category
export const getFilteredFeedbacksByCompanyAndIssueCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { company } = req.user;
    const { companyName, issueCategory, date, isFixed } = req.query;

    if (company !== "EC") {
      return res.status(401).json({
        message: "You are not authorized to access this data!",
      });
    }

    const query: {
      company: string;
      issueCategory?: string;
      date?: string;
      isFixed?: boolean;
    } = { company: (companyName as string) || "" };

    if (issueCategory) {
      query.issueCategory = issueCategory as string;
    }

    if (date) {
      query.date = date as string;
    }

    if (isFixed !== undefined) {
      query.isFixed = isFixed === "false"; // Assuming isFixed is passed as a string
    }

    if (isFixed !== undefined) {
      query.isFixed = isFixed === "true"; // Assuming isFixed is passed as a string
    } 

    const feedbacks = await Promise.resolve(Feedback.find(query));

    return res.status(200).json({ feedbacks });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get post by id and cant be accessed by other companies
export const getFeedbackById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { company } = req.user;

    const feedback = await Promise.resolve(Feedback.findById(id));

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found!" });
    }

    if (company === "EC") {
      return res.status(200).json({ feedback });
    }

    if (feedback?.company !== company) {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this data!" });
    }

    return res.status(200).json({ feedback });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// select the feedback by id and send a message to the user and after that delete the feedback from the database
export const replyFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const { company } = req.user;
    console.log(message);

    const feedback = await Promise.resolve(Feedback.findById(id));

    if (company !== "EC") {
      if (feedback?.company !== company) {
        return res
          .status(401)
          .json({ message: "You are not authorized to delete this feedback!" });
      }
    }

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found!" });
    }

    await sendReplyEmail({
      email: feedback.email,
      firstName: feedback.name,
      lastName: "",
      issue: feedback.message,
      message: message,
      subject: "Feedback Reply",
    })
      .then(() => {
        res.status(200).json({ message: "Email sent successfully!" });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });

    return await Promise.resolve(
      Feedback.findByIdAndUpdate(id, { isFixed: true })
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
