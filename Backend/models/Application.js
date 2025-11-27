// backend/models/Application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resumeLink: String,
  status: { type: String, enum: ["applied","shortlisted","rejected","hired"], default: "applied" },
  appliedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Application || mongoose.model("Application", applicationSchema);
