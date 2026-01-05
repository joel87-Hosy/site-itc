const express = require("express");
const { handleNewsletter } = require("../controllers/emailController");

const router = express.Router();

// POST /api/newsletter - Accept JSON and urlencoded
router.post("/", express.json(), handleNewsletter);
router.post("/", express.urlencoded({ extended: true }), handleNewsletter);

module.exports = router;
