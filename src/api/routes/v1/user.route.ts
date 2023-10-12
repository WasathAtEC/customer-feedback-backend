import express from "express";
import {
  test,
  registerUser,
  loginUser,
  authenticateUser,
} from "../../controller/user.controller";
import { Auth } from "../../middleware/auth";

const router = express.Router();

router.get("/test", Auth, test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/authenticate", Auth, authenticateUser);

export default router;
