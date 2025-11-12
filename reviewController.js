import Review from "../models/Review.js";
import Gig from "../models/Gig.js";

export const addReview = async (req, res) => {
  const { gig: gigId, rating, comment } = req.body;
  const existing = await Review.findOne({ gig: gigId, user: req.user.id });
  if (existing) return res.status(409).json({ message: "Already reviewed" });
  const review = await Review.create({ gig: gigId, user: req.user.id, rating, comment });

  // update aggregates
  const stats = await Review.aggregate([
    { $match: { gig: review.gig } },
    { $group: { _id: "$gig", rating: { $avg: "$rating" }, count: { $sum: 1 } } }
  ]);
  const { rating: avg, count } = stats[0];
  await Gig.findByIdAndUpdate(gigId, { rating: avg, ratingsCount: count });

  res.status(201).json(review);
};

export const listReviews = async (req, res) => {
  const docs = await Review.find({ gig: req.params.gigId }).populate("user", "name");
  res.json(docs);
};
