import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { decodedPayload } from "../../utils/jwtDecoder";

dotenv.config();

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

    const decodedToken = decodedPayload(token);
    req.user = decodedToken;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authorization Failed: Invalid token" });
  }
  return 1;
};
