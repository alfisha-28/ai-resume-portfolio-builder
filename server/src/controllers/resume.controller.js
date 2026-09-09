const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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
    }
  }
  return result;
}

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
    });
    return res.json({ success: true, data: resumes.map(deserializeFromDB) });
  } catch (err) {
    console.error("getResumes error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch resumes" });
  }
}

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
