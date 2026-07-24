const express = require("express");

const router = express.Router();

const {
    getTemplates
} = require("../controllers/template.controller");

router.get("/", getTemplates);

module.exports = router;