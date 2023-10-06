import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET!;

declare global {
  namespace Express {
    interface Request {
      user?: any; // You can replace 'any' with the actual type of your user data.
    }
  }
}

export const Auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization Failed: No token provided" });
    }

    const decodedToken = jwt.verify(token, secret) as { [key: string]: any };
    req.user = decodedToken;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authorization Failed: Invalid token" });
  }
  return 1;
};
