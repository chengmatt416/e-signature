# Quick Start: Building APK and IPA Files

## ✅ Automated Build Setup Complete!

Your repository is now configured to automatically build APK and IPA files using GitHub Actions. Here's what happens:

### 📦 What Gets Built Automatically

1. **Android APK**: Built on every push to main/master branch
2. **iOS IPA**: Built on macOS runners for iOS devices
3. **Release Packages**: Attached to GitHub Releases when you create a tag

### 🚀 How to Trigger Builds

#### Method 1: Merge This PR (Easiest)
Once you merge this pull request to the `main` or `master` branch:
1. GitHub Actions will automatically run
2. APK will be built within ~5-10 minutes
3. Download from the "Actions" tab → "Build Native Apps" workflow → "Artifacts"

#### Method 2: Create a Release Tag
```bash
git tag -a v1.0.0 -m "First release with native apps"
git push origin v1.0.0
```
This will:
- Trigger the build workflow
- Create APK and IPA files
- Attach them to the GitHub Release automatically
- Make them available at: https://github.com/chengmatt416/e-signature/releases

#### Method 3: Manual Workflow Trigger
1. Go to: https://github.com/chengmatt416/e-signature/actions
2. Click "Build Native Apps (APK & IPA)"
3. Click "Run workflow"
4. Select branch and click "Run workflow"

### 📥 Where to Download Built Files

#### From GitHub Actions:
1. Go to https://github.com/chengmatt416/e-signature/actions
2. Click on the latest "Build Native Apps" workflow run
3. Scroll down to "Artifacts"
4. Download:
   - `android-debug-apk` - Ready to install on Android
   - `android-release-apk` - Unsigned release version
   - `ios-build` - iOS build artifacts (requires signing)

#### From Releases:
1. Go to https://github.com/chengmatt416/e-signature/releases
2. Download the APK/IPA from the latest release
3. Install directly on your device

### 📱 Installing the APK on Android

1. Download the APK file
2. On your Android device, go to Settings → Security
3. Enable "Install from Unknown Sources" or "Install Unknown Apps"
4. Open the downloaded APK file
5. Tap "Install"
6. Launch E-Signature!

### 🍎 Installing the IPA on iOS

iOS installation requires one of these methods:

#### Option A: TestFlight (Recommended)
- Coming soon - requires Apple Developer account

#### Option B: PWA Installation (No Developer Account Needed!)
1. Open Safari on your iPhone/iPad
2. Go to: https://chengmatt416.github.io/e-signature/
3. Tap the Share button (□↑)
4. Tap "Add to Home Screen"
5. Tap "Add"
6. App is now installed with offline support!

#### Option C: Xcode/Third-Party Tools
- Requires macOS and Apple Developer account
- See BUILD_NATIVE_APPS.md for details

### 🔧 Building Locally (Optional)

If you want to build on your own computer:

```bash
# Clone the repository
git clone https://github.com/chengmatt416/e-signature.git
cd e-signature

# Run the automated build script
./build-native.sh
```

This will:
- Install dependencies
- Set up Android and iOS platforms
- Build the APK (if you have Java/Android SDK)
- Open Xcode for iOS (if you're on macOS)

### 📊 Build Status

Check the build status badge in the README:
![Build Status](https://github.com/chengmatt416/e-signature/workflows/Build%20Native%20Apps%20(APK%20&%20IPA)/badge.svg)

### 🔍 Current Status

- ✅ GitHub Actions workflow configured
- ✅ Capacitor setup complete  
- ✅ Build scripts ready
- ✅ APK build configured
- ✅ IPA build configured
- ⏳ Waiting for first workflow run
- ⏳ No releases created yet

### 🎯 Next Steps

**To get your APK and IPA right now:**

1. **Merge this PR** to trigger the first build
2. **Wait 5-10 minutes** for GitHub Actions to complete
3. **Download** from Actions → Artifacts
4. **Install** on your device!

Or create a release:
```bash
git checkout main
git tag v1.0.0
git push origin v1.0.0
```

Then download from: https://github.com/chengmatt416/e-signature/releases/tag/v1.0.0

### ❓ Troubleshooting

**Q: Where are the APK/IPA files?**
A: They're built by GitHub Actions. Check the "Actions" tab after merging this PR.

**Q: Can I download them now?**
A: You need to merge this PR or push to main first to trigger the build.

**Q: How long does it take?**
A: ~5-10 minutes for Android APK, ~15-20 minutes for iOS

**Q: Do I need an Apple Developer account?**
A: No! Use the PWA method for iOS (Add to Home Screen in Safari). It works offline and feels like a native app.

### 🎉 That's It!

Your e-signature app will be available as native APK and IPA files as soon as you merge this PR!

For detailed technical documentation, see [BUILD_NATIVE_APPS.md](BUILD_NATIVE_APPS.md).
