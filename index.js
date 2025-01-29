import "dotenv/config"; // Load environment variables from .env
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch, { Headers, Request, Response } from "node-fetch"; // Import Headers, Request, and Response

// Set global fetch for the environment
globalThis.fetch = fetch; // Ensure fetch is available globally
globalThis.Headers = Headers; // Set Headers globally
globalThis.Request = Request; // Set Request globally
globalThis.Response = Response; // Set Response globally

// Initialize the Generative AI model
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function runAI() {
  const prompt =
    "Please make a test table with 10 columns and 10 rows, i want to display with table view.";

  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  } catch (error) {
    console.error("Error:", error);
  }
}

runAI();
