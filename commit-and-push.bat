@echo off
echo ========================================
echo Git Commit and Push Script
echo ========================================
echo.
echo IMPORTANT: Close Cursor before running this script!
echo.
pause

cd /d "b:\BACKEND\node_js\dev-Tinder"

echo.
echo [1/4] Removing lock file...
if exist ".git\index.lock" del /f /q ".git\index.lock"

echo [2/4] Staging all changes...
git add .
if errorlevel 1 (
    echo ERROR: Failed to stage files
    pause
    exit /b 1
)

echo [3/4] Committing changes...
git commit -m "feat: Add OTP email verification system with AWS SES integration

- Implement OTP send and verify endpoints (POST /otp/send-otp, POST /otp/verify-otp)
- Add OTP model with email validation and 5-minute expiration
- Integrate AWS SES for sending OTP emails with HTML templates
- Add rate limiting middleware for OTP requests
- Update email sending utility to support custom subject and body
- Fix email validation in OTP model using proper Mongoose validator syntax"

if errorlevel 1 (
    echo ERROR: Failed to commit
    pause
    exit /b 1
)

echo [4/4] Pushing to GitHub...
git push origin main

if errorlevel 1 (
    echo ERROR: Failed to push
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Code pushed to GitHub
echo ========================================
pause
