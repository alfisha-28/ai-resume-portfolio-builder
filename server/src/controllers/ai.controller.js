const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const prisma = require("../lib/prisma");
const aiService = require("../services/ai.service");

// POST /api/v1/ai/summary
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
  return res.status(200).json(
    new ApiResponse(200, "Summary generated successfully", { summary, text: summary })
  );
});

// POST /api/v1/ai/experience & POST /api/v1/ai/improve-experience
const enhanceExperience = asyncHandler(async (req, res) => {
  const { jobTitle, company, description, text, context, mode } = req.body;
  const enhanced = await aiService.enhanceExperience({
    jobTitle: jobTitle || context,
    company,
    description: description || text,
    mode,
  });
  return res.status(200).json(
    new ApiResponse(200, "Experience enhanced successfully", { description: enhanced, text: enhanced })
  );
});

// POST /api/v1/ai/project & POST /api/v1/ai/improve-project
const generateProjectDescription = asyncHandler(async (req, res) => {
  const { title, technologies, description, text, context, mode } = req.body;
  const result = await aiService.enhanceProject({
    title: title || context,
    technologies,
    description: description || text,
    mode,
  });
  return res.status(200).json(
    new ApiResponse(200, "Project description generated successfully", { description: result, text: result })
  );
});

// POST /api/v1/ai/skills
const suggestSkills = asyncHandler(async (req, res) => {
  const { jobTitle, existingSkills, experience, projects } = req.body;
  const skills = await aiService.suggestSkills({
    jobTitle,
    existingSkills,
    experience,
    projects,
  });
  return res.status(200).json(
    new ApiResponse(200, "Skills suggested successfully", { skills })
  );
});

// POST /api/v1/ai/analyze & POST /api/v1/ai/review/:resumeId
const analyzeResume = asyncHandler(async (req, res) => {
  const { resume, resumeId } = req.body;
  const targetId = resumeId || req.params.resumeId;
  const userId = req.userId || req.user?.id;

  let targetResume = resume;

  if (targetId) {
    const dbResume = await prisma.resume.findFirst({
      where: {
        id: targetId,
        userId,
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
    throw new ApiError(400, "Valid resume data or resumeId is required for analysis");
  }

  const analysis = await aiService.analyzeResume(targetResume);
  return res.status(200).json(
    new ApiResponse(200, "Resume analyzed successfully", analysis)
  );
});

// POST /api/v1/ai/match
const matchJobDescription = asyncHandler(async (req, res) => {
  const { resume, resumeId, jobDescription } = req.body;
  const userId = req.userId || req.user?.id;

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
        userId,
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

  return res.status(200).json(
    new ApiResponse(200, "Job match completed successfully", matchResult)
  );
});

// POST /api/v1/ai/ats-score/:resumeId
const calculateATSScore = asyncHandler(async (req, res) => {
  const resumeId = req.params.resumeId;
  const userId = req.userId || req.user?.id;
  const dbResume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId,
    },
  });

  if (!dbResume) {
    throw new ApiError(404, "Resume not found");
  }

  const analysis = await aiService.analyzeResume(dbResume);
  return res.status(200).json(
    new ApiResponse(200, "ATS score calculated successfully", { score: analysis.overallScore })
  );
});

module.exports = {
  generateSummary,
  enhanceExperience,
  generateProjectDescription,
  suggestSkills,
  analyzeResume,
  matchJobDescription,
  improveExperience: enhanceExperience,
  improveProject: generateProjectDescription,
  reviewResume: analyzeResume,
  calculateATSScore,
};
