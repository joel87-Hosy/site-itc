param([string]$backendUrl = "http://127.0.0.1:3000", [int]$delay = 2)
Write-Host "ITC Backend - Test Suite" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Start-Sleep -Seconds $delay
Write-Host "`n[TEST 1] GET / (Health Check)" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$backendUrl/" -Method GET -UseBasicParsing -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($data | ConvertTo-Json)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host "`n[TEST 2] POST /api/newsletter" -ForegroundColor Yellow
try {
    $body = @{ email = "test.newsletter@example.com" } | ConvertTo-Json
    $response = Invoke-WebRequest -Uri "$backendUrl/api/newsletter" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: ok=$($data.ok), message=$($data.message)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host "`n[TEST 3] POST /api/contact (urlencoded)" -ForegroundColor Yellow
try {
    $body = "nom_complet=Jean Dupont&email=jean.dupont@example.com&telephone=%2B33612345678&sujet=Demande de devis&message=Bonjour"
    $response = Invoke-WebRequest -Uri "$backendUrl/api/contact" -Method POST -ContentType "application/x-www-form-urlencoded" -Body $body -UseBasicParsing -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: ok=$($data.ok)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host "`n[TEST 4] POST /api/contact (JSON)" -ForegroundColor Yellow
try {
    $body = @{
        nom_complet = "Marie Dupont"
        email = "marie.dupont@example.com"
        telephone = "+33698765432"
        sujet = "Maintenance"
        message = "Probleme de connectivite"
    } | ConvertTo-Json
    $response = Invoke-WebRequest -Uri "$backendUrl/api/contact" -Method POST -ContentType "application/json" -Body $body -UseBasicParsing -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: ok=$($data.ok)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host "`nTests Completed - Check siteweb@ivoiretechnocom.ci for emails`n" -ForegroundColor Cyan
