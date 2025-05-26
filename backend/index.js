import "dotenv/config";
import express from "express";
import cors from "cors";
import { searchProfiles } from "./search.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());

app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Internal server error" });
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
})

app.get("/search", async (req, res) => {
  try {
    console.log("search", req.query);
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ error: "Keyword is required" });
    }

    const results = await searchProfiles(keyword);
    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      error: "Failed to search profile",
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
