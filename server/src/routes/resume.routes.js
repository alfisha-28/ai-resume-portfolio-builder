const express = require("express");

const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");

const {
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