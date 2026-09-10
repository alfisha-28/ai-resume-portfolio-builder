const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const {
  generateSummary,
  enhanceExperience,
  generateProjectDescription,
  suggestSkills,
  analyzeResume,
  matchJobDescription,
  improveExperience,
  improveProject,
  reviewResume,
  calculateATSScore,
} = require("../controllers/ai.controller");

router.use(auth);

// Local enhanced AI endpoints
router.post("/summary", generateSummary);
router.post("/experience", enhanceExperience);
router.post("/project", generateProjectDescription);
router.post("/skills", suggestSkills);
router.post("/analyze", analyzeResume);
router.post("/match", matchJobDescription);

// origin/main AI endpoints
router.post("/improve-experience", improveExperience);
router.post("/improve-project", improveProject);
router.post("/review/:resumeId", reviewResume);
router.post("/ats-score/:resumeId", calculateATSScore);

module.exports = router;
