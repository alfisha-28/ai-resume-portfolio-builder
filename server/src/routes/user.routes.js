const express = require("express");
const router = express.Router();

console.log("✅ user.routes.js loaded");

const { registerUser } = require("../controllers/user.controller");

router.post("/register", registerUser);

module.exports = router;