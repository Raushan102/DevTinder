# Git commit script for OTP feature
# First, manually delete: B:\BACKEND\node_js\dev-Tinder\.git\index.lock
# Then run this script

cd b:\BACKEND\node_js\dev-Tinder

Write-Host "Staging all changes..." -ForegroundColor Green
git add .

Write-Host "Committing changes..." -ForegroundColor Green
git commit -m "feat: Add OTP email verification system with AWS SES integration

- Implement OTP send and verify endpoints (POST /otp/send-otp, POST /otp/verify-otp)
- Add OTP model with email validation and 5-minute expiration
- Integrate AWS SES for sending OTP emails with HTML templates
- Add rate limiting middleware for OTP requests
- Update email sending utility to support custom subject and body
- Fix email validation in OTP model using proper Mongoose validator syntax"

Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push origin main

Write-Host "Done!" -ForegroundColor Green
