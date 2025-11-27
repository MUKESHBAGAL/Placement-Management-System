// backend/controllers/jobController.js
import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    // only companies should post
    if (req.user.role !== "company") return res.status(403).json({ message: "Forbidden" });

    const { title, description, salary, location } = req.body;
    const job = await Job.create({ companyId: req.user.id, title, description, salary, location });
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("companyId", "name email");
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("companyId", "name email");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
