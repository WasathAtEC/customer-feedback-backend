import express from "express";
import { test, registerUser, loginUser } from "../../controller/user.controller";
import { Auth } from "../../middleware/auth";

const router = express.Router();

router.get("/test", Auth, test);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;