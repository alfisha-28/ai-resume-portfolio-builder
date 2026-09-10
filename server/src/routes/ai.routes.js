const express = require("express");
const router = express.Router();
<<<<<<< HEAD
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
=======
const auth = require("../middlewares/auth.middleware");
const {
  generateSummary,
  improveExperience,
  improveProject,
  reviewResume,
  calculateATSScore,
} = require("../controllers/ai.controller");

router.use(auth);

router.post("/summary", generateSummary);
router.post("/improve-experience", improveExperience);
router.post("/improve-project", improveProject);
router.post("/review/:resumeId", reviewResume);
router.post("/ats-score/:resumeId", calculateATSScore);
>>>>>>> origin/main

module.exports = router;
