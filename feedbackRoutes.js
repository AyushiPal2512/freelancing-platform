import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// ==========================
// POST /api/feedback
// Create new feedback
// ==========================
router.post("/", async (req, res) => {
  try {
    const { name, message, rating } = req.body;

    if (!message || !rating) {
      return res.status(400).json({ message: "Message and rating are required" });
    }

    const newFeedback = new Feedback({
      name,
      message,
      rating,
    });

    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully", feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ==========================
// GET /api/feedback
// Get all feedback
// ==========================
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
