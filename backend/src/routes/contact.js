const express = require("express");
const multer = require("multer");
const { handleContact } = require("../controllers/emailController");

const router = express.Router();

console.log("[ROUTE] /api/contact route module loaded");

// Configure multer for optional file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
});

// POST /api/contact - Accept both urlencoded and multipart/form-data
router.post(
  "/",
  express.urlencoded({ extended: true }),
  (req, res, next) => {
    const ct = (req.headers["content-type"] || "").toLowerCase();
    console.log("[ROUTE] /api/contact received. Content-Type:", ct);
    if (ct.indexOf("multipart/form-data") !== -1) {
      return upload.single("piece_jointe")(req, res, next);
    }
    return next();
  },
  handleContact
);

module.exports = router;
