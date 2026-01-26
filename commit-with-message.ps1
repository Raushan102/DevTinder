# PowerShell script to commit with detailed message
# Run this outside Cursor in PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Committing OTP Email Verification Feature" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

cd b:\BACKEND\node_js\dev-Tinder

# Remove lock file if exists
if (Test-Path ".git\index.lock") {
    Write-Host "Removing lock file..." -ForegroundColor Yellow
    Remove-Item ".git\index.lock" -Force -ErrorAction SilentlyContinue
}

Write-Host "[1/3] Staging all changes..." -ForegroundColor Green
git add .

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to stage files" -ForegroundColor Red
    exit 1
}

Write-Host "[2/3] Committing with detailed message..." -ForegroundColor Green
git commit -m "feat: Implement OTP email verification system with AWS SES integration

Features Added:
- Complete OTP (One-Time Password) email verification system
- AWS SES (Simple Email Service) integration for sending emails
- Email notification system for connection requests
- Rate limiting middleware to prevent OTP spam/abuse

Backend Changes:
- Add OTP controller with send and verify endpoints (POST /otp/send-otp, POST /otp/verify-otp)
- Create OTP model with email validation and 5-minute auto-expiration
- Implement AWS SES client configuration (ap-south-1 region)
- Add email sending utility with support for custom HTML/text templates
- Integrate email notifications in connection request flow
- Add rate limiting middleware for OTP requests to prevent abuse
- Update app.js to include OTP routes
- Add @aws-sdk/client-ses package dependency

Email Features:
- Professional HTML email templates for OTP delivery
- Customizable email subject and body support
- Proper email validation using Mongoose validators
- Email sent from verified domain (auth@raushankumarsaw.in)

Security & Validation:
- Email format validation in OTP model
- Rate limiting on OTP generation endpoint
- OTP expiration after 5 minutes
- Unique email constraint in OTP schema

Frontend Updates:
- Update App.jsx, Connections, Feed components
- Enhance LoaderButton and Notification utilities
- Update constants and gitignore

Files Changed:
- New: backend/controller/otp.js
- New: backend/model/otp.js
- New: backend/src/routes/otp.js
- New: backend/src/util/sendEmail.js
- New: backend/src/util/sesClient.js
- New: backend/src/util/otpRateLimit.js
- Modified: backend/controller/request.js (email integration)
- Modified: backend/src/app.js (OTP routes)
- Modified: backend/package.json (AWS SDK dependency)
- Modified: frontend components and utilities"

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to commit" -ForegroundColor Red
    exit 1
}

Write-Host "[3/3] Pushing to GitHub..." -ForegroundColor Green
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to push" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "SUCCESS! Code committed and pushed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
