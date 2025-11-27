// backend/controllers/applicationController.js
import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyJob = async (req, res) => {
  try {
    if (req.user.role !== "student") return res.status(403).json({ message: "Only students can apply" });

    const { jobId, resumeLink } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const already = await Application.findOne({ jobId, studentId: req.user.id });
    if (already) return res.status(400).json({ message: "Already applied" });

    const app = await Application.create({ jobId, studentId: req.user.id, resumeLink });
    res.status(201).json(app);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getStudentApplications = async (req, res) => {
  try {
    const apps = await Application.find({ studentId: req.user.id }).populate("jobId");
    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getJobApplications = async (req, res) => {
  try {
    // company can view applications for its job
    if (req.user.role !== "company") return res.status(403).json({ message: "Forbidden" });
    const apps = await Application.find({ jobId: req.params.jobId }).populate("studentId", "name email");
    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
