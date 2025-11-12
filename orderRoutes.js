import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ===== Place New Order =====
router.post("/", async (req, res) => {
  try {
    const { jobTitle, freelancer, status } = req.body;

    if (!jobTitle || !freelancer) {
      return res.status(400).json({ message: "Job title and freelancer required" });
    }

    const newOrder = new Order({
      jobTitle,
      freelancer,
      status: status || "Pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
});

// ===== Get All Orders =====
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

export default router;
