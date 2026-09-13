const express = require("express");

const router = express.Router();

router.use("/users", require("./user.routes"));

router.use("/resumes", require("./resume.routes"));

router.use("/ai", require("./ai.routes"));

router.use("/dashboard", require("./dashboard.routes"));

router.use("/templates", require("./template.routes"));

router.use("/portfolio", require("./portfolio.routes"));
router.use("/portfolios", require("./portfolio.routes"));

const healthRoutes = require("./health.routes");

router.use("/health", healthRoutes);

module.exports = router;