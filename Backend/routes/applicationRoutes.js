// backend/routes/applicationRoutes.js
import express from "express";
import { applyJob, getStudentApplications, getJobApplications } from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/apply", protect, applyJob);
router.get("/me", protect, getStudentApplications);
router.get("/job/:jobId", protect, getJobApplications); // company use
export default router;
