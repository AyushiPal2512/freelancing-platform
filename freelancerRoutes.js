const express = require("express");
const { authMiddleware, isFreelancer } = require("../middlewares/auth");

const router = express.Router();

// Freelancer dashboard API
router.get("/dashboard", authMiddleware, isFreelancer, (req, res) => {
  res.json({ message: `Welcome Freelancer ${req.user.id}` });
});

module.exports = router;
