const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/auth.middleware");
const {
  generateSummary,
  enhanceExperience,
  generateProjectDescription,
  suggestSkills,
  analyzeResume,
  matchJobDescription,
} = require("../controllers/ai.controller");

router.use(authenticateUser);

router.post("/summary", generateSummary);
router.post("/experience", enhanceExperience);
router.post("/project", generateProjectDescription);
router.post("/skills", suggestSkills);
router.post("/analyze", analyzeResume);
router.post("/match", matchJobDescription);

module.exports = router;
