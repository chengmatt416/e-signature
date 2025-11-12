# Building Native APK and IPA Files

This guide explains how to build native Android (APK) and iOS (IPA) applications from the E-Signature PWA.

## Overview

E-Signature is a Progressive Web App (PWA) that can be packaged into native apps for Android and iOS using various tools. This document covers two recommended approaches:

1. **PWABuilder** (Easiest - No coding required)
2. **Capacitor** (More control - Requires Node.js)

## Method 1: PWABuilder (Recommended for Quick Builds)

PWABuilder is a free service by Microsoft that converts PWAs into native apps.

### Steps:

1. **Visit PWABuilder**
   - Go to [https://www.pwabuilder.com/](https://www.pwabuilder.com/)

2. **Enter URL**
   - Input: `https://chengmatt416.github.io/e-signature/`
   - Click "Start"

3. **Review PWA Score**
   - Check the PWA quality report
   - Address any warnings (optional)

4. **Build Android APK**
   - Click "Package for Stores"
   - Select "Android" tab
   - Choose "Google Play" or "APK" option
   - Configure package options:
     - Package ID: `com.esignature.app`
     - App name: `E-Signature`
     - Version: `1.0.0`
   - Click "Generate" and download the package

5. **Build iOS IPA**
   - Click "Package for Stores"
   - Select "iOS" tab
   - Note: iOS apps require a paid Apple Developer account ($99/year)
   - Configure package options:
     - Bundle ID: `com.esignature.app`
     - App name: `E-Signature`
   - Download the iOS source code
   - Follow Apple's instructions to sign and publish

### PWABuilder Advantages:
- ✅ No coding required
- ✅ Free to use
- ✅ Automatic updates from web app
- ✅ Quick turnaround

## Method 2: Capacitor (For Advanced Users)

Capacitor by Ionic allows full control over the native app build process.

### Prerequisites:

```bash
# Install Node.js (v16 or higher)
# Install Android Studio (for APK)
# Install Xcode (for IPA - macOS only)
```

### Setup Instructions:

1. **Initialize Capacitor in the Project**

```bash
# Install Capacitor CLI
npm install -g @capacitor/cli

# Initialize Capacitor (from project root)
npx cap init "E-Signature" "com.esignature.app"

# Add platforms
npx cap add android
npx cap add ios
```

2. **Configure capacitor.config.json**

Create a `capacitor.config.json` file in the project root (this is already included in the repository).

3. **Copy Web Assets**

```bash
# Sync web assets to native projects
npx cap sync
```

4. **Build Android APK**

```bash
# Open Android project in Android Studio
npx cap open android

# In Android Studio:
# 1. Build > Build Bundle(s) / APK(s) > Build APK(s)
# 2. APK will be in: android/app/build/outputs/apk/debug/app-debug.apk
```

For signed release APK:
```bash
# In Android Studio:
# 1. Build > Generate Signed Bundle / APK
# 2. Create a keystore (first time only)
# 3. Select "APK" and configure signing
# 4. Release APK will be in: android/app/release/
```

5. **Build iOS IPA**

```bash
# Open iOS project in Xcode (macOS only)
npx cap open ios

# In Xcode:
# 1. Select "Any iOS Device (arm64)" as target
# 2. Product > Archive
# 3. Distribute App > Ad Hoc or App Store
# 4. Sign with your Apple Developer certificate
# 5. Export IPA file
```

### Capacitor Advantages:
- ✅ Full control over native features
- ✅ Can add native plugins
- ✅ Better debugging
- ✅ Customizable splash screens and icons

## Method 3: Local APK Build (Without App Stores)

For testing or distribution outside app stores:

### Using Capacitor CLI:

```bash
# After Capacitor setup above
cd android
./gradlew assembleDebug

# APK will be at: app/build/outputs/apk/debug/app-debug.apk
```

## iOS Specific Requirements

### For PWA Installation (No IPA needed):

iOS supports PWA installation via Safari:
1. Open `https://chengmatt416.github.io/e-signature/` in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Tap "Add"

The app will work like a native app with offline support.

### For Native IPA:

Requirements:
- macOS with Xcode installed
- Apple Developer Program membership ($99/year)
- Valid signing certificates
- Provisioning profiles

## Distribution Options

### Android:
1. **Google Play Store** (Recommended)
   - Reach billions of users
   - Automatic updates
   - Requires $25 one-time fee

2. **Direct APK Distribution**
   - Users must enable "Install from Unknown Sources"
   - Suitable for internal/beta testing

3. **Alternative Stores**
   - Amazon Appstore
   - Samsung Galaxy Store
   - F-Droid (for open source)

### iOS:
1. **Apple App Store** (Recommended)
   - Only official distribution method
   - Requires Apple Developer Program ($99/year)

2. **TestFlight** (Beta Testing)
   - Free for up to 10,000 testers
   - Requires Apple Developer Program

3. **Enterprise Distribution**
   - For internal company apps only
   - Requires Apple Developer Enterprise Program ($299/year)

## App Store Submission

### Android (Google Play):

1. Create developer account at [Google Play Console](https://play.google.com/console)
2. Create new app
3. Upload APK or AAB (Android App Bundle)
4. Fill in store listing details
5. Set content rating
6. Configure pricing & distribution
7. Submit for review

### iOS (Apple App Store):

1. Enroll in [Apple Developer Program](https://developer.apple.com/programs/)
2. Create app in [App Store Connect](https://appstoreconnect.apple.com/)
3. Upload IPA using Xcode or Transporter
4. Fill in app information
5. Submit for review

## Automated Builds with GitHub Actions

See `BUILD_AUTOMATION.md` for CI/CD pipeline configuration.

## Troubleshooting

### Common Issues:

1. **Icons not showing**: Ensure all icon sizes are present in the `icons/` directory
2. **Service Worker errors**: Check HTTPS is enabled for production
3. **iOS Add to Home Screen not working**: Must use Safari browser on iOS
4. **Android build fails**: Update Android Studio and Gradle to latest versions
5. **iOS build requires code signing**: Obtain certificates from Apple Developer Portal

## Additional Resources

- [PWA Builder Documentation](https://docs.pwabuilder.com/)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/studio/publish)
- [iOS App Distribution Guide](https://developer.apple.com/distribute/)

## Support

For issues specific to native builds, please open an issue on GitHub with:
- Platform (Android/iOS)
- Build method used
- Error messages or logs
- Device/OS version
