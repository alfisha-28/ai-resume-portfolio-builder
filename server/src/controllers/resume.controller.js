const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

<<<<<<< HEAD
const createResume = asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title) {
        throw new ApiError(400, "Resume title is required");
    }

    const resume = await prisma.resume.create({
        data: {
            ...req.body,
            userId: req.user.id,
        },
    });

    return res.status(201).json(
        new ApiResponse(201, "Resume created successfully", resume)
    );
});

const getAllResumes = asyncHandler(async (req, res) => {
    const resumes = await prisma.resume.findMany({
        where: {
            userId: req.user.id,
        },
        orderBy: {
            updatedAt: "desc",
        },
    });

    return res.status(200).json(
        new ApiResponse(200, "Resumes fetched successfully", resumes)
    );
});

const getResumeById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const resume = await prisma.resume.findFirst({
        where: {
            id,
            userId: req.user.id,
        },
    });

    if (!resume) {
        throw new ApiError(404, "Resume not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Resume fetched successfully", resume)
    );
});

const updateResume = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const resume = await prisma.resume.findFirst({
        where: {
            id,
            userId: req.user.id,
        },
    });

    if (!resume) {
        throw new ApiError(404, "Resume not found");
    }

    // Prevent overwriting userId or id from request body
    const { id: _id, userId: _userId, createdAt: _createdAt, updatedAt: _updatedAt, ...updateData } = req.body;

    const updatedResume = await prisma.resume.update({
        where: { id },
        data: updateData,
    });

    return res.status(200).json(
        new ApiResponse(200, "Resume updated successfully", updatedResume)
    );
});

const deleteResume = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const resume = await prisma.resume.findFirst({
        where: {
            id,
            userId: req.user.id,
        },
    });

    if (!resume) {
        throw new ApiError(404, "Resume not found");
=======
const ARRAY_FIELDS = [
  "education", "experience", "projects", "skills",
  "certifications", "languages", "achievements", "interests",
];

const STRING_FIELDS = [
  "title", "fullName", "jobTitle", "email", "phone",
  "location", "linkedin", "github", "portfolio", "summary", "template",
];

// Serialize arrays to JSON strings before writing to SQLite
function serializeForDB(data) {
  const result = {};
  for (const field of STRING_FIELDS) {
    if (data[field] !== undefined) {
      result[field] = typeof data[field] === "string" ? data[field] : String(data[field] ?? "");
    }
  }
  for (const field of ARRAY_FIELDS) {
    if (data[field] !== undefined) {
      const val = data[field];
      result[field] = Array.isArray(val) ? JSON.stringify(val) : "[]";
    }
  }
  return result;
}

// Parse JSON strings back to arrays when reading from SQLite
function deserializeFromDB(record) {
  if (!record) return null;
  const result = { ...record };
  for (const field of ARRAY_FIELDS) {
    try {
      result[field] = typeof result[field] === "string"
        ? JSON.parse(result[field])
        : (Array.isArray(result[field]) ? result[field] : []);
    } catch {
      result[field] = [];
>>>>>>> origin/main
    }
  }
  return result;
}

<<<<<<< HEAD
    await prisma.resume.delete({
        where: { id },
=======
const SAFE_DEFAULTS = {
  title: "Untitled Resume",
  fullName: "", jobTitle: "", email: "", phone: "",
  location: "", linkedin: "", github: "", portfolio: "",
  summary: "", template: "classic",
  education: [], experience: [], projects: [], skills: [],
  certifications: [], languages: [], achievements: [], interests: [],
};

// GET /api/v1/resumes
async function getResumes(req, res) {
  try {
    const resumes = await prisma.resume.findMany({
      where: { userId: req.userId },
      orderBy: { updatedAt: "desc" },
>>>>>>> origin/main
    });
    return res.json({ success: true, data: resumes.map(deserializeFromDB) });
  } catch (err) {
    console.error("getResumes error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch resumes" });
  }
}

<<<<<<< HEAD
    return res.status(200).json(
        new ApiResponse(200, "Resume deleted successfully")
    );
});

const duplicateResume = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const original = await prisma.resume.findFirst({
        where: {
            id,
            userId: req.user.id,
        },
    });

    if (!original) {
        throw new ApiError(404, "Resume not found");
    }

    // Remove fields that should not be copied
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...resumeData } = original;

    const duplicate = await prisma.resume.create({
        data: {
            ...resumeData,
            title: `${original.title} Copy`,
            userId: req.user.id,
        },
    });

    return res.status(201).json(
        new ApiResponse(201, "Resume duplicated successfully", duplicate)
    );
});

module.exports = {
    createResume,
    getAllResumes,
    getResumeById,
    updateResume,
    deleteResume,
    duplicateResume,
};
=======
// GET /api/v1/resumes/:id
async function getResumeById(req, res) {
  try {
    const resume = await prisma.resume.findUnique({ where: { id: req.params.id } });
    if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });
    if (resume.userId !== req.userId) return res.status(403).json({ success: false, message: "Forbidden" });
    return res.json({ success: true, data: deserializeFromDB(resume) });
  } catch (err) {
    console.error("getResumeById error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch resume" });
  }
}

// POST /api/v1/resumes
async function createResume(req, res) {
  try {
    const data = serializeForDB({ ...SAFE_DEFAULTS, ...req.body });
    const resume = await prisma.resume.create({ data: { ...data, userId: req.userId } });
    return res.status(201).json({ success: true, message: "Resume created", data: deserializeFromDB(resume) });
  } catch (err) {
    console.error("createResume error:", err);
    return res.status(500).json({ success: false, message: "Failed to create resume" });
  }
}

// PUT /api/v1/resumes/:id
async function updateResume(req, res) {
  try {
    const existing = await prisma.resume.findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ success: false, message: "Resume not found" });
    if (existing.userId !== req.userId) return res.status(403).json({ success: false, message: "Forbidden" });

    const data = serializeForDB(req.body);
    const updated = await prisma.resume.update({ where: { id: req.params.id }, data });
    return res.json({ success: true, message: "Resume updated", data: deserializeFromDB(updated) });
  } catch (err) {
    console.error("updateResume error:", err);
    return res.status(500).json({ success: false, message: "Failed to update resume" });
  }
}

// DELETE /api/v1/resumes/:id
async function deleteResume(req, res) {
  try {
    const existing = await prisma.resume.findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ success: false, message: "Resume not found" });
    if (existing.userId !== req.userId) return res.status(403).json({ success: false, message: "Forbidden" });

    await prisma.resume.delete({ where: { id: req.params.id } });
    return res.json({ success: true, message: "Resume deleted" });
  } catch (err) {
    console.error("deleteResume error:", err);
    return res.status(500).json({ success: false, message: "Failed to delete resume" });
  }
}

// POST /api/v1/resumes/:id/duplicate
async function duplicateResume(req, res) {
  try {
    const existing = await prisma.resume.findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ success: false, message: "Resume not found" });
    if (existing.userId !== req.userId) return res.status(403).json({ success: false, message: "Forbidden" });

    const { id, createdAt, updatedAt, ...rest } = existing;
    const copy = await prisma.resume.create({
      data: { ...rest, title: `${existing.title} Copy`, userId: req.userId },
    });
    return res.status(201).json({ success: true, message: "Resume duplicated", data: deserializeFromDB(copy) });
  } catch (err) {
    console.error("duplicateResume error:", err);
    return res.status(500).json({ success: false, message: "Failed to duplicate resume" });
  }
}

module.exports = { getResumes, getResumeById, createResume, updateResume, deleteResume, duplicateResume };
>>>>>>> origin/main
