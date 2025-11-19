// AI plagiarism checker backend removed. Placeholder only.
export const checkText = async (req, res) => {
  return res.status(501).json({
    message:
      "AI plagiarism checker backend removed. Implement a new backend and reconnect the frontend.",
  });
};
import { getDetector, initializeDetector } from "../utils/aiDetector.js";
import { detectWithWalter } from "../utils/providers/walterClient.js";

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const computeVerdict = (prob) => {
  if (prob < 30) return "Likely Human-Written";
  if (prob < 60) return "Uncertain - Mixed Content";
  if (prob < 80) return "Likely AI-Assisted";
  return "Highly Likely AI-Generated";
};

const buildSuggestions = (text, aiProbability) => {
  const suggestions = [];

  if (aiProbability > 60) {
    suggestions.push(
      "Add personal experiences or reflections to increase authenticity",
      "Vary sentence structure and wording to reduce uniformity",
      "Include concrete examples, data, or citations to ground claims"
    );
  }

  const processed = text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s && s.trim().length > 0);

  if (processed.length > 0) {
    const wordsPerSentence = processed.map((s) => s.trim().split(/\s+/).length);
    const shortCount = wordsPerSentence.filter((w) => w < 8).length;
    const longCount = wordsPerSentence.filter((w) => w > 25).length;

    if (shortCount > processed.length * 0.4) {
      suggestions.unshift("Combine very short sentences to improve flow");
    }
    if (longCount > processed.length * 0.2) {
      suggestions.unshift("Break up long sentences to enhance readability");
    }
  }

  // Return top 3 most relevant
  return Array.from(new Set(suggestions)).slice(0, 3);
};

export const checkText = async (req, res) => {
  try {
    const { text } = req.body || {};
    if (typeof text !== "string" || text.trim().length < 50) {
      return res.status(400).json({
        status: "error",
        message: "Text must be at least 50 characters.",
      });
    }





    res.status(501).json({ message: "AI plagiarism checker backend removed. Implement a new backend and reconnect the frontend." });
  };
};
