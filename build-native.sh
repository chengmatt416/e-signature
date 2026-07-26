#!/bin/bash

# E-Signature Native App Build Script
# This script builds APK and IPA files for the E-Signature app

set -e

echo "================================================"
echo "E-Signature Native App Build Script"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓${NC} Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} npm found: $(npm --version)"

# Install dependencies
echo ""
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

# Prepare web assets
echo ""
echo -e "${YELLOW}Preparing web assets...${NC}"
npm run prepare-build

# Build Android APK
echo ""
echo "================================================"
echo "Building Android APK"
echo "================================================"

if command -v java &> /dev/null; then
    echo -e "${GREEN}✓${NC} Java found: $(java -version 2>&1 | head -n 1)"
    
    # Add Android platform if not exists
    if [ ! -d "android" ]; then
        echo -e "${YELLOW}Adding Android platform...${NC}"
        npx cap add android
    fi
    
    # Sync Capacitor
    echo -e "${YELLOW}Syncing Capacitor...${NC}"
    npx cap sync android
    
    # Build APK
    echo -e "${YELLOW}Building APK...${NC}"
    cd android
    chmod +x gradlew
    ./gradlew assembleDebug
    cd ..
    
    echo ""
    echo -e "${GREEN}✓ Android APK built successfully!${NC}"
    echo "Location: android/app/build/outputs/apk/debug/app-debug.apk"
else
    echo -e "${RED}✗ Java not found. Skipping Android build.${NC}"
    echo "To build Android APK, install Java JDK 17 or higher and Android SDK"
fi

# Build iOS IPA
echo ""
echo "================================================"
echo "Building iOS IPA"
echo "================================================"

if [[ "$OSTYPE" == "darwin"* ]]; then
    if command -v xcodebuild &> /dev/null; then
        echo -e "${GREEN}✓${NC} Xcode found"
        
        # Add iOS platform if not exists
        if [ ! -d "ios" ]; then
            echo -e "${YELLOW}Adding iOS platform...${NC}"
            npx cap add ios
        fi
        
        # Sync Capacitor
        echo -e "${YELLOW}Syncing Capacitor...${NC}"
        npx cap sync ios
        
        # Install CocoaPods dependencies
        echo -e "${YELLOW}Installing CocoaPods dependencies...${NC}"
        cd ios/App
        pod install
        cd ../..
        
        echo ""
        echo -e "${YELLOW}Opening Xcode...${NC}"
        echo "Please build and archive the app in Xcode:"
        echo "1. Select 'Any iOS Device (arm64)' as target"
        echo "2. Product > Archive"
        echo "3. Distribute App > Ad Hoc or App Store"
        echo "4. Sign with your Apple Developer certificate"
        echo "5. Export IPA file"
        
        npx cap open ios
        
    else
        echo -e "${RED}✗ Xcode not found. Skipping iOS build.${NC}"
        echo "To build iOS IPA, install Xcode from the Mac App Store"
    fi
else
    echo -e "${YELLOW}⚠ iOS builds require macOS with Xcode installed${NC}"
    echo "You are currently on: $OSTYPE"
fi

echo ""
echo "================================================"
echo "Build Process Complete"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. For Android: Test the APK at android/app/build/outputs/apk/debug/app-debug.apk"
echo "2. For iOS: Complete the build process in Xcode (macOS only)"
echo "3. For production builds, use signed release builds"
echo ""
echo "See BUILD_NATIVE_APPS.md for more details"
