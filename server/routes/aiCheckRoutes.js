// AI-check routes removed. Backend is intentionally disabled.
import express from "express";

const router = express.Router();

router.post("/check", (req, res) => {
  res
    .status(501)
    .json({
      message:
        "AI plagiarism checker backend removed. Implement a new backend and reconnect the frontend.",
    });
});

export default router;
