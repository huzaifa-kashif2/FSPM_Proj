// --- Configuration ---
// ⚠️ IMPORTANT: Replace this with the actual base URL of your Node/Express API
export const API_URL = "http://localhost:5000/api/auth";

// --- Helper for Exponential Backoff (Mandatory for API calls) ---
/**
 * Executes a fetch request with exponential backoff for retries.
 * @param {string} url - The API endpoint URL.
 * @param {object} options - Fetch options (method, headers, body, etc.).
 * @param {number} maxRetries - Maximum number of retry attempts.
 */
export const fetchWithRetry = async (url, options, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      // If the response is successful (2xx), or a clear client error (4xx)
      // that retrying won't fix, return the response.
      if (response.status < 500) {
        return response;
      }

      // For server errors (5xx), we proceed to retry
      throw new Error(
        `Server error (${response.status}) on attempt ${attempt}`
      );
    } catch (error) {
      if (attempt === maxRetries) {
        console.error("API call failed after max retries:", error);
        throw error;
      }
      // Wait for 2^attempt seconds before retrying
      const delay = Math.pow(2, attempt) * 1000;
      // console.log(`Retrying in ${delay / 1000}s...`); // Don't log retries as errors
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

/**
 * Sends the token to the backend for verification and fetches user data.
 */
export const verifyToken = async (token) => {
  try {
    const response = await fetchWithRetry(`${API_URL}/verify`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Send the token in the Authorization header for backend validation
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      // Backend returns the user object if the token is valid
      const userData = await response.json();
      // Return user data including the token (important for future requests)
      return { ...userData, token };
    }

    // If 401 Unauthorized or any other error, the token is invalid
    return null;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
