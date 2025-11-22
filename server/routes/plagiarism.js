import express from "express";
import multer from "multer";
import path from "path";
import { checkPlagiarismService } from "../services/plagiarismService.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("File received: ", req.file);
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await checkPlagiarismService(req.file.path);
    console.log("Result: ", result);
    console.log("Matches: ", result.detailedResults[0].matches);
    res.json(result);
  } catch (error) {
    console.error("Error in /plagiarism/check:", error);

    // Handle rate limit errors specifically
    if (error.message?.includes("Rate limit exceeded")) {
      return res.status(429).json({
        error:
          "Rate limit exceeded. Please try again later or reduce the number of paragraphs.",
        details: error.message,
      });
    }

    // Handle other errors
    res.status(500).json({
      error: error.message || "Internal server error",
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

export default router;
