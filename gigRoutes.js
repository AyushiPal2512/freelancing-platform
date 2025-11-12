const express = require("express");
const router = express.Router();
const Gig = require("../models/Gig");

// ✅ Get all gigs
router.get("/", async (req, res) => {
  try {
    const gigs = await Gig.find().populate("user", "username email");
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching gigs" });
  }
});

// ✅ Get single gig by ID
router.get("/:id", async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate("user", "username email");
    if (!gig) return res.status(404).json({ error: "Gig not found" });
    res.json(gig);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching gig" });
  }
});

// ✅ Create new gig
router.post("/", async (req, res) => {
  try {
    const { title, description, category, price, user } = req.body;

    const newGig = new Gig({
      title,
      description,
      category,
      price,
      user
    });

    await newGig.save();
    res.status(201).json(newGig);
  } catch (err) {
    res.status(500).json({ error: "Server error while creating gig" });
  }
});

// ✅ Update gig
router.put("/:id", async (req, res) => {
  try {
    const updatedGig = await Gig.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedGig) return res.status(404).json({ error: "Gig not found" });
    res.json(updatedGig);
  } catch (err) {
    res.status(500).json({ error: "Server error while updating gig" });
  }
});

// ✅ Delete gig
router.delete("/:id", async (req, res) => {
  try {
    const deletedGig = await Gig.findByIdAndDelete(req.params.id);
    if (!deletedGig) return res.status(404).json({ error: "Gig not found" });
    res.json({ message: "Gig deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error while deleting gig" });
  }
});

module.exports = router;
