import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  resetPassword,
  forgotPassword,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getCurrentUser);

router.post("/forgot-password",forgotPassword);

router.put("/reset-password",resetPassword);



export default router;