const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const {
  getUserPortfolio,
  getPortfolioById,
  getPublicPortfolio,
  createPortfolio,
  updatePortfolio,
  publishPortfolio,
  unpublishPortfolio,
  deletePortfolio,
} = require("../controllers/portfolio.controller");

// Public endpoints (no auth required)
router.get("/public/:username", getPublicPortfolio);

// Authenticated endpoints
router.use(auth);

router.get("/", getUserPortfolio);
router.post("/", createPortfolio);
router.get("/detail/:id", getPortfolioById);
router.patch("/:id", updatePortfolio);
router.put("/:id", updatePortfolio);
router.delete("/:id", deletePortfolio);
router.post("/:id/publish", publishPortfolio);
router.post("/:id/unpublish", unpublishPortfolio);

module.exports = router;
