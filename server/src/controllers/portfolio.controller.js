const prisma = require("../lib/prisma");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const DEFAULT_SECTIONS = [
  { id: "hero", label: "Hero", enabled: true },
  { id: "about", label: "About", enabled: true },
  { id: "experience", label: "Experience", enabled: true },
  { id: "projects", label: "Projects", enabled: true },
  { id: "skills", label: "Skills", enabled: true },
  { id: "education", label: "Education", enabled: true },
  { id: "certifications", label: "Certifications", enabled: true },
  { id: "achievements", label: "Achievements", enabled: true },
  { id: "contact", label: "Contact", enabled: true },
];

function parsePortfolioTheme(themeId) {
  if (!themeId) {
    return {
      template: "modern",
      accentColor: "blue",
      sections: DEFAULT_SECTIONS,
      customData: {},
    };
  }

  if (themeId.trim().startsWith("{")) {
    try {
      const parsed = JSON.parse(themeId);
      return {
        template: parsed.template || "modern",
        accentColor: parsed.accentColor || "blue",
        sections: Array.isArray(parsed.sections) ? parsed.sections : DEFAULT_SECTIONS,
        customData: parsed.customData && typeof parsed.customData === "object" ? parsed.customData : {},
      };
    } catch {
      // fallback if JSON corrupted
    }
  }

  const legacyTemplate = ["modern", "minimal", "professional", "creative"].includes(themeId.toLowerCase())
    ? themeId.toLowerCase()
    : "modern";

  return {
    template: legacyTemplate,
    accentColor: "blue",
    sections: DEFAULT_SECTIONS,
    customData: {},
  };
}

function parseJsonField(val, fallback = []) {
  if (Array.isArray(val)) return val;
  if (!val || typeof val !== "string") return fallback;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

function parseResumeData(resume) {
  if (!resume) return null;
  return {
    ...resume,
    education: parseJsonField(resume.education),
    experience: parseJsonField(resume.experience),
    projects: parseJsonField(resume.projects),
    skills: parseJsonField(resume.skills),
    certifications: parseJsonField(resume.certifications),
    languages: parseJsonField(resume.languages),
    achievements: parseJsonField(resume.achievements),
    interests: parseJsonField(resume.interests),
  };
}

function formatPortfolio(portfolio, isPublic = false) {
  const config = parsePortfolioTheme(portfolio.themeId);
  const parsedResume = parseResumeData(portfolio.resume);

  let sanitizedResume = parsedResume;
  if (isPublic && parsedResume) {
    const showEmail = config.customData?.showEmail !== false;
    const showPhone = Boolean(config.customData?.showPhone);
    const showLocation = config.customData?.showLocation !== false;

    sanitizedResume = {
      ...parsedResume,
      email: showEmail ? parsedResume.email : "",
      phone: showPhone ? parsedResume.phone : "",
      location: showLocation ? parsedResume.location : "",
    };
  }

  return {
    id: portfolio.id,
    userId: portfolio.userId,
    resumeId: portfolio.resumeId,
    username: portfolio.username,
    themeId: portfolio.themeId,
    template: config.template,
    accentColor: config.accentColor,
    sections: config.sections,
    customData: config.customData,
    published: portfolio.published,
    createdAt: portfolio.createdAt,
    updatedAt: portfolio.updatedAt,
    resume: sanitizedResume,
  };
}

// GET /api/v1/portfolio
const getUserPortfolio = asyncHandler(async (req, res) => {
  const portfolio = await prisma.portfolio.findFirst({
    where: {
      userId: req.user.id,
    },
    include: {
      resume: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  if (!portfolio) {
    return res.status(200).json(
      new ApiResponse(200, "No portfolio found", null)
    );
  }

  return res.status(200).json(
    new ApiResponse(200, "Portfolio fetched successfully", formatPortfolio(portfolio))
  );
});

// GET /api/v1/portfolio/:id
const getPortfolioById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const portfolio = await prisma.portfolio.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
    include: {
      resume: true,
    },
  });

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "Portfolio fetched successfully", formatPortfolio(portfolio))
  );
});

// GET /api/v1/portfolio/public/:username
const getPublicPortfolio = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username) {
    throw new ApiError(400, "Username is required");
  }

  const cleanUsername = username.trim().toLowerCase();

  const portfolio = await prisma.portfolio.findUnique({
    where: {
      username: cleanUsername,
    },
    include: {
      resume: true,
    },
  });

  if (!portfolio || !portfolio.published) {
    throw new ApiError(404, "Portfolio not found or is currently private");
  }

  return res.status(200).json(
    new ApiResponse(200, "Public portfolio fetched successfully", formatPortfolio(portfolio, true))
  );
});

// POST /api/v1/portfolio
const createPortfolio = asyncHandler(async (req, res) => {
  const { resumeId, username, template = "modern", accentColor = "blue", sections, customData } = req.body;

  if (!resumeId) {
    throw new ApiError(400, "A valid resumeId is required to build a portfolio");
  }

  if (!username) {
    throw new ApiError(400, "A unique username is required");
  }

  const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
  if (cleanUsername.length < 3 || cleanUsername.length > 30) {
    throw new ApiError(400, "Username must be between 3 and 30 characters (letters, numbers, hyphens only)");
  }

  // Verify resume belongs to user
  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId: req.user.id,
    },
  });

  if (!resume) {
    throw new ApiError(404, "Resume not found or unauthorized");
  }

  // Check username uniqueness
  const existingUsername = await prisma.portfolio.findUnique({
    where: {
      username: cleanUsername,
    },
  });

  if (existingUsername && existingUsername.userId !== req.user.id) {
    throw new ApiError(409, `The username "${cleanUsername}" is already taken. Please choose another.`);
  }

  // Check if user already has a portfolio
  const existingUserPortfolio = await prisma.portfolio.findFirst({
    where: {
      userId: req.user.id,
    },
  });

  const themeConfig = JSON.stringify({
    template: ["modern", "minimal", "professional", "creative"].includes(template) ? template : "modern",
    accentColor: ["blue", "purple", "green", "orange", "monochrome"].includes(accentColor) ? accentColor : "blue",
    sections: Array.isArray(sections) && sections.length > 0 ? sections : DEFAULT_SECTIONS,
    customData: customData || {},
  });

  let portfolio;
  if (existingUserPortfolio) {
    portfolio = await prisma.portfolio.update({
      where: { id: existingUserPortfolio.id },
      data: {
        resumeId,
        username: cleanUsername,
        themeId: themeConfig,
      },
      include: {
        resume: true,
      },
    });
  } else {
    portfolio = await prisma.portfolio.create({
      data: {
        userId: req.user.id,
        resumeId,
        username: cleanUsername,
        themeId: themeConfig,
        published: false,
      },
      include: {
        resume: true,
      },
    });
  }

  return res.status(201).json(
    new ApiResponse(201, "Portfolio created successfully", formatPortfolio(portfolio))
  );
});

// PATCH /api/v1/portfolio/:id
const updatePortfolio = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { resumeId, username, template, accentColor, sections, customData, published } = req.body;

  const existing = await prisma.portfolio.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
  });

  if (!existing) {
    throw new ApiError(404, "Portfolio not found or unauthorized");
  }

  const updateData = {};

  if (typeof published === "boolean") {
    updateData.published = published;
  }

  if (resumeId) {
    const resumeExists = await prisma.resume.findFirst({
      where: { id: resumeId, userId: req.user.id },
    });
    if (!resumeExists) {
      throw new ApiError(404, "Selected resume not found or unauthorized");
    }
    updateData.resumeId = resumeId;
  }

  if (username) {
    const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
    if (cleanUsername.length < 3 || cleanUsername.length > 30) {
      throw new ApiError(400, "Username must be between 3 and 30 characters");
    }
    if (cleanUsername !== existing.username) {
      const taken = await prisma.portfolio.findUnique({
        where: { username: cleanUsername },
      });
      if (taken && taken.id !== existing.id) {
        throw new ApiError(409, `The username "${cleanUsername}" is already taken`);
      }
      updateData.username = cleanUsername;
    }
  }

  // Update theme configuration
  const currentConfig = parsePortfolioTheme(existing.themeId);
  const nextConfig = {
    template: template || currentConfig.template,
    accentColor: accentColor || currentConfig.accentColor,
    sections: Array.isArray(sections) ? sections : currentConfig.sections,
    customData: customData !== undefined ? customData : currentConfig.customData,
  };

  updateData.themeId = JSON.stringify(nextConfig);

  const updated = await prisma.portfolio.update({
    where: { id },
    data: updateData,
    include: {
      resume: true,
    },
  });

  return res.status(200).json(
    new ApiResponse(200, "Portfolio updated successfully", formatPortfolio(updated))
  );
});

// POST /api/v1/portfolio/:id/publish
const publishPortfolio = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existing = await prisma.portfolio.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
  });

  if (!existing) {
    throw new ApiError(404, "Portfolio not found or unauthorized");
  }

  const updated = await prisma.portfolio.update({
    where: { id },
    data: { published: true },
    include: {
      resume: true,
    },
  });

  return res.status(200).json(
    new ApiResponse(200, "Portfolio published successfully", formatPortfolio(updated))
  );
});

// POST /api/v1/portfolio/:id/unpublish
const unpublishPortfolio = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existing = await prisma.portfolio.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
  });

  if (!existing) {
    throw new ApiError(404, "Portfolio not found or unauthorized");
  }

  const updated = await prisma.portfolio.update({
    where: { id },
    data: { published: false },
    include: {
      resume: true,
    },
  });

  return res.status(200).json(
    new ApiResponse(200, "Portfolio unpublished successfully", formatPortfolio(updated))
  );
});

// DELETE /api/v1/portfolio/:id
const deletePortfolio = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existing = await prisma.portfolio.findFirst({
    where: {
      id,
      userId: req.user.id,
    },
  });

  if (!existing) {
    throw new ApiError(404, "Portfolio not found or unauthorized");
  }

  await prisma.portfolio.delete({
    where: { id },
  });

  return res.status(200).json(
    new ApiResponse(200, "Portfolio deleted successfully")
  );
});

module.exports = {
  getUserPortfolio,
  getPortfolioById,
  getPublicPortfolio,
  createPortfolio,
  updatePortfolio,
  publishPortfolio,
  unpublishPortfolio,
  deletePortfolio,
};
