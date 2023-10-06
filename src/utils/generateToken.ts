import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import { IJwtToken } from "../types/portalUser";

dotenv.config();

const secret = process.env.JWT_SECRET!;

export const generateToken = (options: IJwtToken) => {
  return sign(
    {
      email: options.email,
      userId: options.userId,
      role: options.role,
      company: options.company,
    },
    secret,
    {
        expiresIn: "24h",
    }
  );
};
