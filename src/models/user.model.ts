import { company } from "./../enums/company";
import mongoose from "mongoose";
import { UserRole } from "./../enums/userRole";

const userScheema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required!"],
  },

  lastName: {
    type: String,
    required: [true, "Last Name is required!"],
  },

  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: [true, "Email is required!"],
    unique: false,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, "Password is required!"],
  },

  company: {
    type: String,
    enum: Object.values(company),
    required: [true, "Company is required!"],
  },

  role: {
    type: String,
    enum: Object.values(UserRole),
    required: [true, "Role is required!"],
  },
});

export default mongoose.model("User", userScheema);
