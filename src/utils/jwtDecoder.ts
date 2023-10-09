import { verify } from "jsonwebtoken";
import { IJwtToken } from "../types/portalUser";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET!;

export const decodedPayload = (token: string): IJwtToken => {
  const payload: IJwtToken = verify(token, secret) as IJwtToken;
  return payload;
};
