const http = require("http");

const backendUrl = "http://localhost:3000";

function makeRequest(
  method,
  path,
  body = null,
  contentType = "application/json"
) {
  return new Promise((resolve, reject) => {
    const url = new URL(backendUrl + path);
    const options = {
      method,
      headers: {},
    };

    if (contentType) options.headers["Content-Type"] = contentType;
    if (body) options.headers["Content-Length"] = Buffer.byteLength(body);

    const req = http.request(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(data),
          });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

async function runTests() {
  console.log("\n=== ITC Backend Test Suite ===\n");

  // Test 1: GET /
  console.log("[TEST 1] GET / (Health Check)");
  try {
    const result = await makeRequest("GET", "/");
    console.log(`  Status: ${result.status}`);
    console.log(`  Response: ${JSON.stringify(result.data)}\n`);
  } catch (err) {
    console.error("  Error stack:", err && err.stack ? err.stack : err);
    console.log();
  }

  // Test 2: POST /api/newsletter
  console.log("[TEST 2] POST /api/newsletter");
  try {
    const body = JSON.stringify({ email: "test.newsletter@example.com" });
    const result = await makeRequest("POST", "/api/newsletter", body);
    console.log(`  Status: ${result.status}`);
    console.log(
      `  Response: ok=${result.data.ok}, message=${result.data.message}\n`
    );
  } catch (err) {
    console.error("  Error stack:", err && err.stack ? err.stack : err);
    console.log();
  }

  // Test 3: POST /api/contact (urlencoded)
  console.log("[TEST 3] POST /api/contact (urlencoded)");
  try {
    const body =
      "nom_complet=Jean Dupont&email=jean.dupont@example.com&telephone=%2B33612345678&sujet=Demande de devis&message=Bonjour, je suis interesse par vos services";
    const result = await makeRequest(
      "POST",
      "/api/contact",
      body,
      "application/x-www-form-urlencoded"
    );
    console.log(`  Status: ${result.status}`);
    console.log(`  Response: ok=${result.data.ok}\n`);
  } catch (err) {
    console.error("  Error stack:", err && err.stack ? err.stack : err);
    console.log();
  }

  // Test 4: POST /api/contact (JSON)
  console.log("[TEST 4] POST /api/contact (JSON)");
  try {
    const body = JSON.stringify({
      nom_complet: "Marie Dupont",
      email: "marie.dupont@example.com",
      telephone: "+33698765432",
      sujet: "Maintenance de reseau",
      message:
        "Nous avons un probleme de connectivite. Pouvez-vous venir faire un diagnostic?",
    });
    const result = await makeRequest("POST", "/api/contact", body);
    console.log(`  Status: ${result.status}`);
    console.log(`  Response: ok=${result.data.ok}\n`);
  } catch (err) {
    console.error("  Error stack:", err && err.stack ? err.stack : err);
    console.log();
  }

  console.log("=== Tests Completed ===");
  console.log("Check siteweb@ivoiretechnocom.ci for received emails\n");
}

runTests();
