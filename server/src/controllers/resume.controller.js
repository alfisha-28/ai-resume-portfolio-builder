const prisma = require("../lib/prisma");

const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const JSON_FIELDS = [
    "education",
    "experience",
    "projects",
    "skills",
    "certifications",
    "languages",
    "achievements",
    "interests",
];

const STRING_FIELDS = [
    "title",
    "fullName",
    "jobTitle",
    "email",
    "phone",
    "location",
    "linkedin",
    "github",
    "portfolio",
    "summary",
    "template",
];

function sanitizeResumeInput(body) {
    const data = {};

    for (const field of STRING_FIELDS) {
        if (field in body) {
            data[field] = body[field] !== undefined && body[field] !== null ? String(body[field]) : "";
        }
    }

    for (const field of JSON_FIELDS) {
        if (field in body) {
            const val = body[field];
            if (typeof val === "string") {
                data[field] = val;
            } else if (Array.isArray(val) || (val && typeof val === "object")) {
                data[field] = JSON.stringify(val);
            } else {
                data[field] = "[]";
            }
        }
    }

    return data;
}

function parseJsonField(val, fallback = []) {
    if (Array.isArray(val)) return val;
    if (!val || typeof val !== "string") return fallback;
    try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed) ? parsed : fallback;
    } catch {
        return fallback;
    }
}

function formatResume(resume) {
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

const createResume = asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title) {
        throw new ApiError(400, "Resume title is required");
    }

    const sanitizedData = sanitizeResumeInput(req.body);

    const resume = await prisma.resume.create({
        data: {
            ...sanitizedData,
            title: title || "Untitled Resume",
            userId: req.user.id,
        },
    });

    return res.status(201).json(
        new ApiResponse(201, "Resume created successfully", formatResume(resume))
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
        new ApiResponse(200, "Resumes fetched successfully", resumes.map(formatResume))
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
        new ApiResponse(200, "Resume fetched successfully", formatResume(resume))
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

    // Sanitize input: convert array fields to JSON strings and drop invalid fields/relations
    const updateData = sanitizeResumeInput(req.body);

    const updatedResume = await prisma.resume.update({
        where: { id },
        data: updateData,
    });

    return res.status(200).json(
        new ApiResponse(200, "Resume updated successfully", formatResume(updatedResume))
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
    }

    await prisma.resume.delete({
        where: { id },
    });

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
        new ApiResponse(201, "Resume duplicated successfully", formatResume(duplicate))
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