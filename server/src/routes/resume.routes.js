const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const {
<<<<<<< HEAD
    createResume,
    getAllResumes,
    getResumeById,
    updateResume,
    deleteResume,
    duplicateResume,
} = require("../controllers/resume.controller");

router.post("/", authenticateUser, createResume);

router.get("/", authenticateUser, getAllResumes);

router.get("/:id", authenticateUser, getResumeById);

router.put("/:id", authenticateUser, updateResume);

router.delete("/:id", authenticateUser, deleteResume);

router.post("/:id/duplicate", authenticateUser, duplicateResume);

module.exports = router;
=======
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
>>>>>>> origin/main
