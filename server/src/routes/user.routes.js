const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");

const {
    registerUser,
    loginUser,
    getProfile
} = require("../controllers/user.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateUser, getProfile);

module.exports = router;