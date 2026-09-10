const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/auth.middleware");

const {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    changePassword,
} = require("../controllers/user.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateUser, getProfile);
router.put("/profile", authenticateUser, updateProfile);
router.put("/password", authenticateUser, changePassword);

module.exports = router;