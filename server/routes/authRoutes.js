import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
  updateMfaSettings,
  getMfaSettings,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile", protect, updateProfile);
router.get("/mfa-settings", protect, getMfaSettings);
router.put("/mfa-settings", protect, updateMfaSettings);

export default router;
