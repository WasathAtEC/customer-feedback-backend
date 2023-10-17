import nodemailer from "nodemailer";
import mailgen from "mailgen";
import dotenv from "dotenv";
import { IEmail } from "../types/email";

dotenv.config();

const { EMAIL, PASSWORD } = process.env;

let configGmail = {
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
};

let transporter = nodemailer.createTransport(configGmail);

const mailGenerator = new mailgen({
  theme: "default",
  product: {
    name: "Elysian Crest Customer Feedback Portal",
    link: "https://www.elysiancrest.com",
  },
});

export const sendReplyEmail = async ({
  email,
  firstName,
  lastName,
  issue,
  message,
  subject,
  instructions,
}: IEmail) => {
  try {
    instructions = instructions || "";

    const response = {
      body: {
        name: firstName + " " + lastName,
        intro: `<strong>Issue:</strong> <br>${issue}`,
        outro: `<strong>Related Response: </strong> <br>${message}`,
      },
    };

    const mail = mailGenerator.generate(response);

    const messageBody = {
      from: EMAIL,
      to: email,
      subject: subject,
      html: mail,
    };

    await transporter
      .sendMail(messageBody)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
