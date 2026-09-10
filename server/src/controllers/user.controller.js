<<<<<<< HEAD
const prisma = require("../lib/prisma");
=======
>>>>>>> origin/main
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

<<<<<<< HEAD
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
=======
function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
}

// POST /api/v1/users/register
async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    const token = generateToken(user.id);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: { token, user: { id: user.id, name: user.name, email: user.email } },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ success: false, message: "Registration failed" });
  }
}

// POST /api/v1/users/login
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    return res.json({
      success: true,
      message: "Login successful",
      data: { token, user: { id: user.id, name: user.name, email: user.email } },
>>>>>>> origin/main
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
}

<<<<<<< HEAD
=======
// GET /api/v1/users/profile
async function getProfile(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, name: true, email: true, createdAt: true },
    });

>>>>>>> origin/main
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

<<<<<<< HEAD
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
=======
    return res.json({ success: true, data: user });
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch profile" });
  }
}

module.exports = { register, login, getProfile };
>>>>>>> origin/main
