// backend/models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  salary: String,
  location: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Job || mongoose.model("Job", jobSchema);
