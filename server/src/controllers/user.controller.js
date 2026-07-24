const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

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

const loginUser = asyncHandler(async (req, res) => {
    console.log("1. Login API called");

    const { email, password } = req.body;
    console.log("2. Body:", email);

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    console.log("3. Finding user...");

    const user = await prisma.user.findUnique({
        where: { email }
    });

    console.log("4. User:", user);

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    console.log("5. Comparing password...");

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    console.log("6. Result:", isPasswordCorrect);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user);

    console.log("7. Sending response");

   return res.status(200).json(
    new ApiResponse(
        200,
        "Login successful",
        {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    )
);

});

const getProfile = asyncHandler(async (req, res) => {

    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
        }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            "Profile fetched successfully",
            user
        )
    );
});

const createResume = asyncHandler(async (req, res) => {

    const {
        title,
        summary,
        education,
        experience,
        skills,
        projects,
        certifications,
        languages,
        template
    } = req.body;

    if (!title) {
        throw new ApiError(400, "Resume title is required");
    }

});


module.exports = {
    registerUser,
    loginUser,
    getProfile
};