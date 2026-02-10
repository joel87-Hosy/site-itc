require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const path = require("path");
const nodemailer = require("nodemailer"); // Ajouté ici

const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------------------
//  SÉCURITÉ & MIDDLEWARES
// ----------------------------------------
app.use(
  helmet({
    contentSecurityPolicy: false, // Désactivé pour faciliter le chargement des scripts/styles externes au début
  }),
);
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
  }),
);

// ----------------------------------------
//  ROUTES API & NEWSLETTER
// ----------------------------------------

// La route spécifique pour votre newsletter ITC
app.post("/api/newsletter", async (req, res) => {
  const { email } = req.body;
  console.log(`[NEWSLETTER] Tentative d'inscription pour : ${email}`);

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure:
      process.env.SMTP_SECURE === "true" ||
      process.env.SMTP_SECURE === "ssl" ||
      process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  try {
    await transporter.sendMail({
      from: `"Site Web ITC" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Nouvel abonné Newsletter !",
      text: `Vous avez un nouvel abonné : ${email}`,
      html: `<b>Nouvel abonné :</b> ${email}`,
    });

    res
      .status(200)
      .send("Succès ! Vous êtes bien abonné à la newsletter d'ITC.");
  } catch (error) {
    console.error("[MAIL ERROR]", error);
    res.status(500).send("Erreur lors de l'envoi du mail.");
  }
});

// Vos autres routes existantes
app.use("/api", require("./src/routes"));

// ROUTE POUR LE FORMULAIRE DE CONTACT ITC
app.post("/api/contact", async (req, res) => {
  const { nom_complet, email, telephone, sujet, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure:
      process.env.SMTP_SECURE === "true" ||
      process.env.SMTP_SECURE === "ssl" ||
      process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  try {
    await transporter.sendMail({
      from: `"Contact ITC" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `Nouveau Message ITC : ${sujet}`,
      html: `
        <h3>Nouveau message reçu depuis le site Ivoire Techno Com</h3>
        <p><b>Nom :</b> ${nom_complet}</p>
        <p><b>Email :</b> ${email}</p>
        <p><b>Téléphone :</b> ${telephone}</p>
        <p><b>Sujet :</b> ${sujet}</p>
        <p><b>Message :</b><br>${message}</p>
      `,
    });

    res.status(200).send("Message envoyé");
  } catch (error) {
    console.error("[CONTACT ERROR]", error);
    res.status(500).send("Erreur d'envoi");
  }
});

/// ----------------------------------------
//  SERVIR LE SITE WEB (Correction du chemin)
// ----------------------------------------

// On ajoute "../" pour dire au serveur de sortir du dossier 'backend'
// pour trouver l'index.html dans le dossier parent 'IvoireTechnoCom'
app.use(express.static(path.join(__dirname, "../")));

// Si vous avez un dossier public au même niveau que index.html
app.use("/public", express.static(path.join(__dirname, "../public")));

// ----------------------------------------
//  GESTION DES ERREURS & 404
// ----------------------------------------

app.use((req, res) => {
  console.log(`[404] ${req.method} ${req.url}`);
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("[ERROR]", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

// ----------------------------------------
//  LANCEMENT UNIQUE DU SERVEUR
// ----------------------------------------
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 ITC backend listening on http://localhost:${PORT}`),
);
