@echo off
echo ========================================
echo Starting Lost n Found Frontend Server
echo ========================================
echo.

REM Get the directory where this batch file is located
cd /d "%~dp0"

echo Current directory: %CD%
echo.

REM Check if package.json exists
if not exist "package.json" (
    echo ERROR: package.json not found!
    echo Please make sure you're running this from the LostnFound-FE directory.
    pause
    exit /b 1
)

REM Check if src folder exists
if not exist "src" (
    echo ERROR: src folder not found!
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo ERROR: node_modules not found!
    echo Please run install.bat first to install dependencies.
    pause
    exit /b 1
)

REM Check Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Starting development server...
echo Server will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

REM Try using npx with explicit path
npx http-server ./src -p 3000 -a localhost --cors -c-1 -o

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to start server!
    echo Trying alternative method...
    echo.
    npm run dev
)

pause



