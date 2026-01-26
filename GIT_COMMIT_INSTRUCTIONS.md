# Problem: Cannot Push Code to GitHub

## Root Cause
Cursor's Git extension is actively monitoring the repository and holding file locks, preventing Git operations from completing. This causes:
- `.git/index.lock` file blocking all Git write operations
- Permission denied errors when Git tries to write to `.git/objects/`
- Multiple Cursor processes interfering with Git commands

## Solution: Run Git Commands Outside Cursor

### Step 1: Close Cursor Completely
- Close all Cursor windows
- Make sure no Cursor processes are running (check Task Manager)

### Step 2: Open External PowerShell/Command Prompt
- Press `Win + R`
- Type `powershell` or `cmd`
- Press Enter

### Step 3: Navigate to Project and Run Commands
```powershell
cd b:\BACKEND\node_js\dev-Tinder

# Delete lock file if it exists
if (Test-Path ".git\index.lock") { Remove-Item ".git\index.lock" -Force }

# Stage all changes
git add .

# Commit with proper message
git commit -m "feat: Add OTP email verification system with AWS SES integration

- Implement OTP send and verify endpoints (POST /otp/send-otp, POST /otp/verify-otp)
- Add OTP model with email validation and 5-minute expiration
- Integrate AWS SES for sending OTP emails with HTML templates
- Add rate limiting middleware for OTP requests
- Update email sending utility to support custom subject and body
- Fix email validation in OTP model using proper Mongoose validator syntax"

# Push to GitHub
git push origin main
```

### Alternative: Use the PowerShell Script
Run `commit-changes.ps1` in an external PowerShell window (outside Cursor).

## Why This Happens
Cursor's Git extension monitors the repository in real-time. When you run Git commands from within Cursor's terminal, it conflicts with the extension's file monitoring, causing locks and permission issues.

## Prevention
- Use Cursor's built-in Source Control panel (Ctrl+Shift+G) for Git operations
- Or always use external terminal for Git commands
- Or disable Git auto-refresh in Cursor settings temporarily when committing
