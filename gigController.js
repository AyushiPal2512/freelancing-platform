import Gig from "../models/Gig.js";

export const createGig = async (req, res) => {
  const gig = await Gig.create({ ...req.body, seller: req.user.id });
  res.status(201).json(gig);
};

export const listGigs = async (req, res) => {
  const q = req.query.q?.trim();
  const filter = q
    ? { $or: [{ title: { $regex: q, $options: "i" } }, { tags: { $in: [q] } }] }
    : {};
  const gigs = await Gig.find(filter).populate("seller", "name avatar");
  res.json(gigs);
};

export const getGig = async (req, res) => {
  const gig = await Gig.findById(req.params.id).populate("seller", "name avatar");
  if (!gig) return res.status(404).json({ message: "Gig not found" });
  res.json(gig);
};
