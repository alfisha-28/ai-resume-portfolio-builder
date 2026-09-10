const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, getProfile);

<<<<<<< HEAD
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
=======
module.exports = router;
>>>>>>> origin/main
