@echo off
echo ========================================
echo Lost n Found Frontend - Installation
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

REM Check Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check npm
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed!
    pause
    exit /b 1
)

echo Installing dependencies...
echo.
npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Installation completed successfully!
    echo ========================================
    echo.
    echo To start the development server:
    echo   npm run dev
    echo.
    echo To start the production server:
    echo   npm start
    echo.
    echo Frontend will be available at: http://localhost:3000
    echo Make sure backend is running on: http://localhost:8080
    echo.
) else (
    echo.
    echo ERROR: Installation failed!
    echo.
)

pause


