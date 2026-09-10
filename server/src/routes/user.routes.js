const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.put("/password", auth, changePassword);

module.exports = router;
