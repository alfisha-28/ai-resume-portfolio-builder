const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const prisma = require("../lib/prisma");
const aiService = require("../services/ai.service");

const generateSummary = asyncHandler(async (req, res) => {
  const { fullName, jobTitle, skills, experience, currentSummary, mode } = req.body;
  const summary = await aiService.generateSummary({
    fullName,
    jobTitle,
    skills,
    experience,
    currentSummary,
    mode,
  });
  return res.status(200).json(new ApiResponse(200, "Summary generated successfully", { summary }));
});

const enhanceExperience = asyncHandler(async (req, res) => {
  const { jobTitle, company, description, mode } = req.body;
  const enhanced = await aiService.enhanceExperience({
    jobTitle,
    company,
    description,
    mode,
  });
  return res.status(200).json(new ApiResponse(200, "Experience enhanced successfully", { description: enhanced }));
});

const generateProjectDescription = asyncHandler(async (req, res) => {
  const { title, technologies, description, mode } = req.body;
  const result = await aiService.enhanceProject({
    title,
    technologies,
    description,
    mode,
  });
  return res.status(200).json(new ApiResponse(200, "Project description generated successfully", { description: result }));
});

const suggestSkills = asyncHandler(async (req, res) => {
  const { jobTitle, existingSkills, experience, projects } = req.body;
  const skills = await aiService.suggestSkills({
    jobTitle,
    existingSkills,
    experience,
    projects,
  });
  return res.status(200).json(new ApiResponse(200, "Skills suggested successfully", { skills }));
});

const analyzeResume = asyncHandler(async (req, res) => {
  const { resume, resumeId } = req.body;

  let targetResume = resume;

  // If a resumeId is specified, verify ownership
  if (resumeId) {
    const dbResume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId: req.user.id,
      },
    });

    if (!dbResume) {
      throw new ApiError(404, "Resume not found or unauthorized");
    }

    // Prefer client-provided latest edit state if passed, otherwise use DB record
    if (!targetResume) {
      targetResume = dbResume;
    }
  }

  if (!targetResume || typeof targetResume !== "object") {
    throw new ApiError(400, "Valid resume data or resumeId is required for analysis");
  }

  const analysis = await aiService.analyzeResume(targetResume);
  return res.status(200).json(new ApiResponse(200, "Resume analyzed successfully", analysis));
});

const matchJobDescription = asyncHandler(async (req, res) => {
  const { resume, resumeId, jobDescription } = req.body;

  if (!jobDescription || typeof jobDescription !== "string" || jobDescription.trim().length < 50) {
    throw new ApiError(400, "Please provide a valid job description (minimum 50 characters)");
  }

  if (jobDescription.length > 25000) {
    throw new ApiError(400, "Job description is too long (maximum 25,000 characters)");
  }

  let targetResume = resume;

  if (resumeId) {
    const dbResume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId: req.user.id,
      },
    });

    if (!dbResume) {
      throw new ApiError(404, "Resume not found or unauthorized");
    }

    if (!targetResume) {
      targetResume = dbResume;
    }
  }

  if (!targetResume || typeof targetResume !== "object") {
    throw new ApiError(400, "Valid resume data or resumeId is required for job matching");
  }

  const matchResult = await aiService.matchJob({
    resume: targetResume,
    jobDescription: jobDescription.trim(),
  });

  return res.status(200).json(new ApiResponse(200, "Job match completed successfully", matchResult));
});

module.exports = {
  generateSummary,
  enhanceExperience,
  generateProjectDescription,
  suggestSkills,
  analyzeResume,
  matchJobDescription,
};
