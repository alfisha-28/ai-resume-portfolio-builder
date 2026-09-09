const express = require("express");
const router = express.Router();
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

module.exports = router;
