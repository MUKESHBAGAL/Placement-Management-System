// backend/routes/jobRoutes.js
import express from "express";
import { createJob, getJobs, getJobById } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/create", protect, createJob);

export default router;
