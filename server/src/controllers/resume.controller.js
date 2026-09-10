const prisma = require("../lib/prisma");

const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

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