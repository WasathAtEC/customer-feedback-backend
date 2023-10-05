import { IFeedbackInputDTO } from "types/feedback";
import Feedback from "../../models/feedback.model";
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
