import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import path from "path";

dotenv.config();
await connectDB();

const app = express();
const allowed = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : ["http://localhost:5173"];
app.use(cors({ origin: (origin, cb) => { if (!origin || allowed.includes(origin)) return cb(null, true); return cb(new Error("Not allowed by CORS")); }, credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use("/media", express.static(path.join(process.cwd(), "media")));
app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);
app.get("/api/health", (req, res) => res.json({ status: "OK", time: new Date().toISOString() }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Racing Plate backend running on port ${PORT}`));
