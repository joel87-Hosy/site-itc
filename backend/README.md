# ITC Backend

Backend Node.js/Express pour traiter les formulaires de contact et newsletter du site ITC.

## Installation

1. Installer les dépendances npm:

```bash
cd backend
npm install
```

## Configuration

Le fichier `.env` contient la configuration SMTP. Les valeurs actuelles sont:

- **SMTP_HOST**: mail.ivoiretechnocom.ci
- **SMTP_USER**: siteweb@ivoiretechnocom.ci
- **ADMIN_EMAIL**: info@ivoiretechnocom.ci (où les formulaires sont envoyés)

## Démarrage

```bash
npm start
```

Le serveur écoute sur `http://localhost:3000`

## Endpoints

### GET /

Health check endpoint - confirme que le serveur fonctionne.

**Réponse:**

```json
{
  "status": "ok",
  "message": "ITC Backend is running"
}
```

### POST /api/contact

Traite les soumissions du formulaire de contact.

**Données requises (form-data ou urlencoded):**

- `nom_complet`: string (requis)
- `email`: string (requis, email valide)
- `telephone`: string (requis)
- `sujet`: string (requis)
- `message`: string (requis)
- `piece_jointe`: file (optionnel, max 8MB)

**Réponse (succès):**

```json
{
  "ok": true,
  "message": "Votre message a été envoyé. Nous vous répondrons rapidement."
}
```

**Réponse (erreur):**

```json
{
  "ok": false,
  "error": "Description de l'erreur"
}
```

### POST /api/newsletter

Traite les inscriptions à la newsletter.

**Données requises (JSON ou urlencoded):**

- `email`: string (requis, email valide)

**Réponse (succès):**

```json
{
  "ok": true,
  "message": "Merci de votre inscription à la newsletter!"
}
```

## Test

Ouvrez `backend/test.html` dans votre navigateur pour tester les endpoints.

Ou utilisez curl:

```bash
# Test GET
curl http://localhost:3000/

# Test Contact (multipart)
curl -F "nom_complet=Jean" -F "email=jean@example.com" -F "telephone=0123456789" \
  -F "sujet=Test" -F "message=Bonjour" http://localhost:3000/api/contact

# Test Newsletter (JSON)
curl -X POST -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}' http://localhost:3000/api/newsletter
```

## Frontend Integration

Le formulaire contact du site (contact.html) envoie automatiquement les données via fetch au backend.
