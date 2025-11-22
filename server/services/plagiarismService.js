import axios from "axios";
import { extractTextFromFile } from "../utils/fileHandler.js";
import stringSimilarity from "string-similarity";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

// Delay function to add pauses between requests
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Retry function with exponential backoff for rate limit errors
async function makeRequestWithRetry(url, params, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await axios.get(url, { params });
      return response;
    } catch (error) {
      // Check if it's a rate limit error (429)
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers["retry-after"];
        const waitTime = retryAfter
          ? parseInt(retryAfter) * 1000
          : Math.pow(2, attempt) * 1000; // Exponential backoff: 1s, 2s, 4s

        if (attempt < maxRetries - 1) {
          console.log(
            `Rate limit hit. Waiting ${waitTime / 1000}s before retry ${
              attempt + 2
            }/${maxRetries}...`
          );
          await delay(waitTime);
          continue;
        } else {
          throw new Error(
            "Rate limit exceeded. Please try again later or reduce the number of paragraphs."
          );
        }
      }
      // For other errors, throw immediately
      throw error;
    }
  }
}

async function checkPlagiarismService(filePath) {
  const fileText = await extractTextFromFile(filePath);

  console.log(fileText.length);

  const paragraphs = fileText
    .split("\n")
    .filter((paragraph) => paragraph.trim().length > 0);

  const overallResults = [];
  const paragraphScores = [];

  // Add delay between requests to avoid hitting rate limits (1 second delay)
  const REQUEST_DELAY_MS = 1000;

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];

    const words = paragraph.split(/\s+/);
    const query = words.slice(0, 50).join(" ");

    if (!query.trim()) continue;

    // Add delay before each request (except the first one)
    if (i > 0) {
      await delay(REQUEST_DELAY_MS);
    }

    try {
      const response = await makeRequestWithRetry(
        "https://www.googleapis.com/customsearch/v1",
        {
          q: query,
          key: GOOGLE_API_KEY,
          cx: SEARCH_ENGINE_ID,
        }
      );

      const data = response.data;

      let maxSimilairity = 0;

      const matches = [];

      for (const item of data.items || []) {
        const snippet = item.snippet || "";
        const similarity =
          stringSimilarity.compareTwoStrings(
            (paragraph || "").toLowerCase(),
            snippet.toLowerCase()
          ) * 100;

        if (similarity > maxSimilairity) {
          maxSimilairity = similarity;
        }

        matches.push({
          title: item.title,
          link: item.link,
          snippet,
          similarity: `${similarity.toFixed(2)}%`,
        });
      }

      paragraphScores.push(maxSimilairity);
      overallResults.push({
        paragraphIndex: i + 1,
        paragraph,
        maxSimilarity: `${maxSimilairity.toFixed(2)}%`,
        matches,
      });
    } catch (error) {
      console.error(`Error checking paragraph ${i + 1}:`, error.message);
      // Continue with next paragraph even if one fails
      // You might want to add this paragraph with an error status
      overallResults.push({
        paragraphIndex: i + 1,
        paragraph,
        maxSimilairity: "Error",
        matches: [],
        error: error.message,
      });
    }
  }

  const overallScore =
    paragraphScores.length > 0
      ? paragraphScores.reduce((a, b) => a + b, 0) / paragraphScores.length
      : 0;

  const isPlagiarised = overallScore > 30;

  const totalChars = fileText.length;

  return {
    overallScore: `${overallScore.toFixed(2)}%`,
    isPlagiarised: isPlagiarised,
    detailedResults: overallResults,
    totalChars,
  };
}

export { checkPlagiarismService };
