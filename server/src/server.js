require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user.routes");
const resumeRoutes = require("./routes/resume.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// ─── Routes ───────────────────────────────────────────────────────────────
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/resumes", resumeRoutes);
app.use("/api/v1/ai", aiRoutes);

// ─── Health check ─────────────────────────────────────────────────────────
app.get("/api/v1/health", (_req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// ─── 404 handler ──────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Global error handler ─────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
