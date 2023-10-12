import { Request, Response } from "express";
import { IPortalUserInputDTO, ILoginData } from "types/portalUser";
import userModel from "../../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken";
import { sendReplyEmail } from "../../utils/mailer";

// test route
export const test = (_req: Request, res: Response) => {
  res.status(200).json({
    hello: "world",
  });
};

// register user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData: IPortalUserInputDTO = req.body;

    if (
      !userData.email ||
      !userData.firstName ||
      !userData.lastName ||
      !userData.password ||
      !userData.role
    ) {
      return res.status(400).json({ message: "Please fill required fields!" });
    }

    const existingEmail = await Promise.resolve(
      userModel.findOne({ email: userData.email })
    );

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new userModel({
      ...userData,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    await sendReplyEmail({
      email: savedUser.email,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      message:
        "Welcome to Elysian Crest Customer Feedback Portal. We are excited to have you on board!",
      subject: "Elysian Crest Customer Feedback Portal",
      instructions:
        "Click the button below to login to your account and check your feedback status.",
      btnText: "Login to your account",
    });

    res
      .status(201)
      .json({ message: "User created successfully!", user: savedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  return 1;
};

// login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const loginData: ILoginData = req.body;

    const checkEmail = await Promise.resolve(
      userModel.findOne({ email: loginData.email })
    );

    if (!checkEmail) {
      return res.status(400).json({ message: "Email does not exist!" });
    }

    const role = checkEmail.role;
    const company = checkEmail.company;

    const checkPassword = await Promise.resolve(
      bcrypt.compare(loginData.password, checkEmail.password)
    );

    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    const token = generateToken({
      email: checkEmail.email,
      userId: checkEmail._id.toString(),
      role: checkEmail.role,
      company: checkEmail.company,
    });

    return res.status(200).json({
      message: "Login successful!",
      token: token,
      expiresIn: 3600,
      role: role,
      company: company,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  return 1;
};

// authenticate the user
export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { email, role, company } = req.user;

    return res.status(200).json({
      message: "Authentication successful!",
      email: email,
      role: role,
      company: company,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}