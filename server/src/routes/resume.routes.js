const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  duplicateResume,
} = require("../controllers/resume.controller");

router.use(auth);

router.get("/", getResumes);
router.get("/:id", getResumeById);
router.post("/", createResume);
router.put("/:id", updateResume);
router.delete("/:id", deleteResume);
router.post("/:id/duplicate", duplicateResume);

module.exports = router;
