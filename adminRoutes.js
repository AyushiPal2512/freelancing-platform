const express = require("express");
const User = require("../models/user");
const { authMiddleware, isAdmin } = require("../middlewares/auth");

const router = express.Router();

// Get all users (Admin only)
router.get("/users", authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

module.exports = router;
