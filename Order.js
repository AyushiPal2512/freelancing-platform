import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    freelancer: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
