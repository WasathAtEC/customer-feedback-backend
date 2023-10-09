import { Request, Response, NextFunction } from "express";
import UserModel from "../../models/user.model";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.method == "GET" ? req.query : req.body;

    let exits = await Promise.resolve(UserModel.findOne({ email }));
    if (!exits) return res.status(404).send({ error: "Can't find the User" });
    next();
  } catch (error) {
    return res.status(404).send({ message: "Authentication Failed!" });
  }
  return 1;
};
