// models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  budget: { type: Number },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
