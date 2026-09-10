const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    const token = generateToken(user);

    const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
    };

    return res.status(201).json(
        new ApiResponse(201, "User registered successfully", {
            token,
            user: userResponse,
        })
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user);

    return res.status(200).json(
        new ApiResponse(200, "Login successful", {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        })
    );
});

const updateProfile = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name || !name.trim()) {
        throw new ApiError(400, "Name is required");
    }

    const user = await prisma.user.update({
        where: { id: req.user.id },
        data: { name: name.trim() },
        select: { id: true, name: true, email: true },
    });

    return res.status(200).json(
        new ApiResponse(200, "Profile updated successfully", user)
    );
});

const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        throw new ApiError(400, "Both passwords are required");
    }

    if (newPassword.length < 6) {
        throw new ApiError(400, "New password must be at least 6 characters");
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    const isCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isCorrect) {
        throw new ApiError(401, "Current password is incorrect");
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
        where: { id: req.user.id },
        data: { password: hashed },
    });

    return res.status(200).json(
        new ApiResponse(200, "Password changed successfully")
    );
});

const getProfile = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });

    res.set("Cache-Control", "no-store");

    return res.status(200).json(
        new ApiResponse(200, "Profile fetched successfully", user)
    );
});

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    changePassword,
};