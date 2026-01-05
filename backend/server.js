require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------------------
//  SECURITÉ & MIDDLEWARES
// ----------------------------------------
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log minimal pour debug
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  next();
});

// Rate limit
app.use(
  rateLimit({
    windowMs: (process.env.RATE_LIMIT_WINDOW_MINUTES || 1) * 60 * 1000,
    max: process.env.RATE_LIMIT_MAX_REQUESTS || 60,
  })
);

// ----------------------------------------
//  SERVIR LE SITE WEB (HTML, CSS, JS…)
// ----------------------------------------

// Sert tous les fichiers HTML/CSS/JS dans le dossier principal
app.use(express.static(path.join(__dirname)));

// Sert /public si tu as des assets séparés
app.use("/public", express.static(path.join(__dirname, "public")));

// Favicon
app.get("/favicon.ico", (req, res) => {
  const faviconPath = path.join(__dirname, "images", "logo-ITC-fond-noir.jpeg");
  res.sendFile(faviconPath, (err) => {
    if (err) console.warn("Could not send favicon:", err.message);
  });
});

// ----------------------------------------
//  ROUTES API
// ----------------------------------------
app.use("/api", require("./src/routes"));

// Test API
app.get("/", (req, res) => {
  res.json({ status: "ok", msg: "ITC Backend" });
});

// ----------------------------------------
//  404 GÉNÉRIQUE
// ----------------------------------------
app.use((req, res) => {
  console.log(`[404] ${req.method} ${req.url}`);
  res.status(404).json({ error: "Route not found" });
});

// ----------------------------------------
//  ERREURS
// ----------------------------------------
app.use((err, req, res, next) => {
  console.error("[ERROR]", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

// ----------------------------------------
//  LANCEMENT DU SERVEUR
// ----------------------------------------
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 ITC backend listening on http://localhost:${PORT}`)
);
