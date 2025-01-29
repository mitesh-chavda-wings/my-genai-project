import express from "express";
import "dotenv/config"; // Load environment variables from .env
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch, { Headers, Request, Response } from "node-fetch"; // Import Headers, Request, and Response

// Initialize Express App
const app = express();
const port = 3535;

// Set global fetch for the environment
globalThis.fetch = fetch;
globalThis.Headers = Headers;
globalThis.Request = Request;
globalThis.Response = Response;

// Initialize Generative AI Model
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve Static Files (e.g., CSS, JS)
app.use(express.static("public"));

// Home Route to Render Form and Show Results
app.get("/", (req, res) => {
  res.render("index", { prompt: "", response: "" }); // Show empty form initially
});

// API Route to Process Prompt and Return Result
app.post("/", async (req, res) => {
  const prompt = req.body.prompt || "";

  try {
    // Send the prompt to Generative AI
    const result = await model.generateContent(prompt);

    // Render result in the same template
    res.render("index", { prompt, response: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    res.render("index", {
      prompt,
      response: "Failed to generate content, please try again.",
    });
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
