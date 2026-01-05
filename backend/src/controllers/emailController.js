const nodemailer = require("nodemailer");
const validator = require("validator");

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "siteweb@ivoiretechnocom.ci";

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure:
      process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

async function handleContact(req, res) {
  try {
    const { nom_complet, email, telephone, sujet, message } = req.body || {};

    // Validation
    if (!nom_complet || !email || !telephone || !sujet || !message) {
      return res.status(400).json({
        ok: false,
        error: "Tous les champs obligatoires doivent être remplis.",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        ok: false,
        error: "L'adresse email n'est pas valide.",
      });
    }

    const transport = createTransport();

    // Email HTML
    const htmlContent = `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${escapeHtml(nom_complet)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Téléphone:</strong> ${escapeHtml(telephone)}</p>
      <p><strong>Sujet:</strong> ${escapeHtml(sujet)}</p>
      <hr />
      <h3>Message:</h3>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `;

    // Send email
    await transport.sendMail({
      from: process.env.SMTP_USER,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `[Contact ITC] ${sujet}`,
      html: htmlContent,
    });

    console.log(`✓ Contact email sent from ${email}`);

    return res.json({
      ok: true,
      message: "Votre message a été envoyé. Nous vous répondrons rapidement.",
    });
  } catch (err) {
    console.error("[handleContact Error]", err.message);
    return res.status(500).json({
      ok: false,
      error: "Erreur lors de l'envoi du message. Veuillez réessayer.",
    });
  }
}

async function handleNewsletter(req, res) {
  try {
    const email = req.body?.email || req.query?.email;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        ok: false,
        error: "Adresse email invalide.",
      });
    }

    const transport = createTransport();

    const htmlContent = `
      <h2>Nouvelle inscription à la newsletter</h2>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p>Cette adresse a été ajoutée à la liste de diffusion ITC.</p>
    `;

    await transport.sendMail({
      from: process.env.SMTP_USER,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: "[Newsletter ITC] Nouvelle inscription",
      html: htmlContent,
    });

    console.log(`✓ Newsletter signup from ${email}`);

    return res.json({
      ok: true,
      message: "Merci de votre inscription à la newsletter!",
    });
  } catch (err) {
    console.error("[handleNewsletter Error]", err.message);
    return res.status(500).json({
      ok: false,
      error: "Erreur lors de l'inscription. Veuillez réessayer.",
    });
  }
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

module.exports = { handleContact, handleNewsletter };
