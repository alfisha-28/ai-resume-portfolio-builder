const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");

const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Check existing user
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists with this email");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    // Remove password from response
    const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
    };

    return res.status(201).json(
        new ApiResponse(
            201,
            "User registered successfully",
            userResponse
        )
    );

});

module.exports = {
    registerUser
};