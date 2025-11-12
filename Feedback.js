import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true }, // ✅ must match frontend
    rating: { type: Number, required: true },  // ✅ must match frontend
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", FeedbackSchema);
