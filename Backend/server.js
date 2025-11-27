// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

import User from "./models/User.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

await connectDB(); // ensure top-level await works in your Node version (v18+). If error, call connectDB() without await.

app.get("/", (req, res) => res.send("Placement Backend Running"));

// test insert (optional)
app.get("/test-insert", async (req, res) => {
  try {
    const existing = await User.findOne({ email: "test@example.com" });
    if (existing) return res.send("Test user already exists");
    const u = await User.create({ name: "Test User", email: "test@example.com", password: "123456", role: "student" });
    res.send("User inserted and DB working!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
