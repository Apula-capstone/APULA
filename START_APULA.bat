@echo off
TITLE APULA - Automated Prevention Unit for Lethal Ablaze
echo ===================================================
echo   APULA SYSTEM STARTUP (OFFLINE MODE)
echo ===================================================

:: Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please run the "nodejs-installer.msi" in the folder first.
    echo If you already installed it, try RESTARTING your computer.
    pause
    exit
)

:: Check for node_modules
if not exist "node_modules\" (
    echo [INFO] First time setup: Installing system components...
    echo This may take a few minutes. Please wait...
    call npm install
    
    echo [INFO] Creating Desktop Shortcut...
    cscript //nologo CREATE_SHORTCUT.vbs
    echo [SUCCESS] Shortcut "APULA Dashboard" added to your Desktop!
)

echo [INFO] Starting APULA Dashboard...
echo [INFO] The dashboard will open in your browser shortly.
echo [INFO] Keep this window open while using the system.
echo [INFO] Press CTRL+C to stop the system.

:: Open the browser after a short delay
timeout /t 3 /nobreak >nul
start http://localhost:3000

:: Start the server
call npm run dev

pause