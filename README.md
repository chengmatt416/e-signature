# E-Signature

A secure, client-side digital signature application that runs entirely in your browser. Create, encrypt, and verify digital signatures without sending any data to a server.

## 🚀 Features

- **✍️ Signature Canvas**: Draw your signature using mouse or touch
- **🔒 Random-Key Encryption**: Each signature uses a completely random encryption key that changes every time
- **🛡️ Maximum Security**: Random key is encrypted with Sign-ID - impossible to predict or replicate
- **📅 Auto-Fill**: Automatically captures date, time, and device ID
- **🆔 Unique Sign-ID**: Each signature gets a unique identifier used to decrypt the random key
- **💾 Export**: Download encrypted `.esig` files
- **✅ Verification**: Decrypt and verify signature authenticity with Sign-ID only
- **🔐 Privacy**: 100% client-side - no data sent to servers
- **🔑 Simple Decryption**: Only Sign-ID needed - no passphrases to remember
- **🔐 Admin Direct Sign**: Built-in keypad for admin passcode entry (no device keyboard)
- **📱 Progressive Web App**: Install on Android, iOS, or desktop for offline use
- **🌍 Global Legal Compliance**: Multi-jurisdiction support (10+ jurisdictions worldwide)
- **⚖️ Taiwan Legal Compliance**: Compliant with Taiwan's Electronic Signatures Act (電子簽章法)
- **🇪🇺 EU eIDAS Compatible**: Simple Electronic Signature (SES) level
- **🇺🇸 US ESIGN/UETA Compliant**: Valid across all 50 states
- **🌐 International Support**: UNCITRAL Model Law framework (70+ countries)
- **🔒 Integrity Verification**: SHA-256 hash ensures signature and document integrity
- **👤 Signer Identity**: Captures signer's name, ID number, and contact information

## 📖 How to Use

### Creating a Signature

1. Open `sign.html`
2. Enter activation code from admin
3. **Select your jurisdiction** (determines legal framework):
   - 🇹🇼 Taiwan - Electronic Signatures Act
   - 🇪🇺 European Union - eIDAS Regulation
   - 🇺🇸 United States - ESIGN Act / UETA
   - 🇬🇧 United Kingdom - Electronic Communications Act
   - 🇨🇦 Canada - PIPEDA
   - 🇦🇺 Australia - Electronic Transactions Act
   - 🇸🇬 Singapore - Electronic Transactions Act
   - 🇯🇵 Japan - Electronic Signatures Act
   - 🇭🇰 Hong Kong - Electronic Transactions Ordinance
   - 🌐 International - UNCITRAL Model Law (Global Use)
4. **Fill in signer information** (required for legal compliance):
   - Full Name (姓名)
   - National ID or Passport Number (身分證字號/護照號碼)
   - Email and Phone (optional)
4. **Read and accept the legal notice** regarding Taiwan's Electronic Signatures Act
5. Draw your signature on the canvas
6. (Optional) Upload a document to be signed
7. System automatically fills:
   - Unique Sign-ID
   - Current date and time (ISO 8601 format)
   - Device fingerprint
8. Click "Save & Export" to download encrypted `.esig` file
9. **IMPORTANT**: Save your Sign-ID - it's the only way to decrypt the signature

### Decrypting a Signature

1. Open `decrypt.html`
2. Upload the `.esig` file
3. **Enter the Sign-ID** (the only key needed for decryption)
4. Click "Decrypt & Verify"
5. View signature details including:
   - Signer identity information
   - Signature image
   - Document integrity verification (if document was attached)
   - Legal compliance information
6. Download the signature image or attached document

**Note**: Only the Sign-ID is needed to decrypt. The encryption process uses a one-time random nonce and asymmetric key derivation (write-only vs read-only keys) that makes it impossible to re-encrypt even with the Sign-ID and decrypted content.

## 🌐 GitHub Pages

Visit the live application: [https://chengmatt416.github.io/e-signature/](https://chengmatt416.github.io/e-signature/)

## 📱 Install as Native App

E-Signature is available as both a Progressive Web App (PWA) and native mobile applications!

### 🤖 Download Native Apps

#### Android APK
- **Download from GitHub Releases**: Check the [Releases page](https://github.com/chengmatt416/e-signature/releases) for the latest APK
- **Automated Builds**: APK files are automatically built on every release
- **Installation**: Download the APK and install directly (enable "Install from Unknown Sources" in settings)

#### iOS IPA  
- **Download from GitHub Releases**: Check the [Releases page](https://github.com/chengmatt416/e-signature/releases) for iOS builds
- **TestFlight**: Coming soon for beta testing
- **App Store**: Planned for future release

### 📲 Install as Web App (PWA)

E-Signature can also be installed as a Progressive Web App for instant access without downloading from app stores!

#### On Android (Chrome/Edge)

1. Visit [https://chengmatt416.github.io/e-signature/](https://chengmatt416.github.io/e-signature/)
2. Tap the menu (⋮) in the browser
3. Select "Install app" or "Add to Home screen"
4. Follow the prompts to install
5. The app will appear on your home screen and can be launched like a native app

#### On iOS (Safari)

1. Visit [https://chengmatt416.github.io/e-signature/](https://chengmatt416.github.io/e-signature/)
2. Tap the Share button (□↑)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" to confirm
5. The app will appear on your home screen with full offline support

**iOS Features:**
- ✅ Full offline functionality
- ✅ Standalone mode (no browser UI)
- ✅ Native-like experience
- ✅ Automatic updates
- ✅ No App Store required

#### On Desktop (Chrome/Edge/Brave)

1. Visit [https://chengmatt416.github.io/e-signature/](https://chengmatt416.github.io/e-signature/)
2. Look for the install icon (⊕) in the address bar
3. Click "Install" in the prompt
4. The app will open in its own window and be added to your applications

**Benefits of PWA Installation:**
- ✅ Works offline after first visit
- ✅ Faster loading times
- ✅ Native app-like experience
- ✅ No app store required
- ✅ Automatic updates
- ✅ Cross-platform compatibility

## 🛠️ Build Native Apps Yourself

Want to build the APK and IPA files yourself? See [BUILD_NATIVE_APPS.md](BUILD_NATIVE_APPS.md) for detailed instructions.

Quick start:
```bash
# Run the automated build script
./build-native.sh
```

Or trigger automated builds via GitHub Actions on every push/release.

## 🔧 Technical Details

### File Structure
- `index.html` - Landing page with information
- `sign.html` - Signature creation page
- `decrypt.html` - Signature decryption and verification page

### Security
- **Random-Key Encryption**: Each signature uses a completely random 256-bit encryption key
- **No Relationship with Sign-ID**: Encryption key is randomly generated, changes every time
- **One-Time Encryption Nonce**: Each encryption uses a unique random nonce that prevents re-encryption
- **Asymmetric Key Derivation**: Encryption uses write-only keys, decryption uses read-only keys
- All encryption/decryption happens client-side using JavaScript Web Crypto API
- **AES-256-GCM encryption** with PBKDF2 key derivation (100,000 iterations)
- **Key Wrapping**: Random encryption key is wrapped with a one-time encryption key
- **Decryption with Sign-ID**: Sign-ID + stored nonce derives the decryption key
- **Re-encryption Prevention**: Encryption keys are write-only and include random nonce
- No data transmission to external servers
- **SHA-256 hashing** ensures signature and document integrity
- **Timestamp in ISO 8601 format** for precise time recording
- Random IV (initialization vector) for each encryption ensures uniqueness

### Encryption Details
**Version 6.0 (One-Time Encryption with Asymmetric Key Usage)**:
- **Algorithm**: AES-256-GCM (authenticated encryption)
- **Data Encryption Key**: Completely random, generated fresh for each signature
- **Key Wrapping**: PBKDF2 with SHA-256, 100,000 iterations
- **Encryption Nonce**: 32-byte random nonce generated once during encryption
- **Key Derivation**: Sign-ID + nonce combined with salt 'wrap-key-v6'
- **Write-Only Key**: Derived with 'encrypt' usage only (cannot decrypt)
- **Read-Only Key**: Derived with 'decrypt' usage only (cannot encrypt)
- **Key Size**: 256 bits for all keys
- **Security Model**: One-time nonce + usage-restricted keys prevent re-encryption
- **Re-encryption Prevention**: Decryption key has no 'encrypt' capability (enforced by Web Crypto API)
- **Backward Compatibility**: Can still decrypt v5.0 files (legacy format)

### Global Legal Compliance

This application provides **multi-jurisdiction support** for legally valid electronic signatures across 10+ jurisdictions worldwide:

#### Supported Jurisdictions:

1. **🇹🇼 Taiwan** - Electronic Signatures Act (電子簽章法) + Personal Data Protection Act
2. **🇪🇺 European Union** - eIDAS Regulation (Simple Electronic Signature) + GDPR
3. **🇺🇸 United States** - ESIGN Act + UETA (all 50 states)
4. **🇬🇧 United Kingdom** - Electronic Communications Act 2000 + UK GDPR
5. **🇨🇦 Canada** - PIPEDA + Provincial Electronic Commerce Acts
6. **🇦🇺 Australia** - Electronic Transactions Act 1999 + Privacy Act 1988
7. **🇸🇬 Singapore** - Electronic Transactions Act + PDPA
8. **🇯🇵 Japan** - Act on Electronic Signatures and Certification Business
9. **🇭🇰 Hong Kong** - Electronic Transactions Ordinance + Privacy Ordinance
10. **🌐 International** - UNCITRAL Model Law (70+ countries)

#### Key Legal Requirements Met:

1. **Signer Identification**: Captures signer's full name and national ID/passport number
2. **Signature Intent**: Requires explicit legal consent before signing (jurisdiction-specific)
3. **Document Integrity**: Uses SHA-256 hash to ensure signature and documents remain unchanged
4. **Timestamp**: Records signature time in ISO 8601 format with proper timezone
5. **Non-repudiation**: Encrypted signature linked to signer's identity and unique Sign-ID
6. **Jurisdiction Marking**: Clearly identifies applicable legal framework
7. **Privacy Compliance**: Client-side processing complies with GDPR, PDPA, PIPEDA, Privacy Act, etc.

#### Legal Validity:

- ✅ **Admissible in court** as evidence (where electronic signatures are accepted)
- ✅ **Legally binding** for contracts and agreements (with party consent)
- ✅ **Privacy compliant** - no data transmission, client-side only
- ✅ **Industry-standard encryption** - AES-256-GCM, SHA-256, PBKDF2

**Legal Notice**: While this application implements technical requirements for electronic signature laws in multiple jurisdictions, legal validity may vary depending on:
- Specific use case and context
- Acceptance by all contracting parties
- Applicable laws and regulations
- Document type (some documents require physical signatures)

For critical legal documents, consult with a qualified legal professional in your jurisdiction.

**See [GLOBAL_LEGAL_COMPLIANCE.md](GLOBAL_LEGAL_COMPLIANCE.md)** for comprehensive legal information.

### Taiwan-Specific Compliance (電子簽章法)

For Taiwan users, this application complies with:
- **Electronic Signatures Act** (電子簽章法) - All technical requirements
- **Personal Data Protection Act** (個人資料保護法) - Privacy by design
- **Civil Code** provisions for electronic contracts
- **Cyber Security Management Act** principles

**See [TAIWAN_LAWS_RESEARCH.md](TAIWAN_LAWS_RESEARCH.md)** for detailed Taiwan law analysis.

### File Format (.esig)

**Version 7.0 (Multi-Jurisdiction Support):**
```json
{
  "version": "7.0",
  "jurisdiction": "TW|EU|US|UK|CA|AU|SG|JP|HK|INTL",
  "legalFramework": {
    "primaryLaw": "Electronic Signatures Act",
    "country": "Taiwan (R.O.C.)",
    "complianceStandard": "TW Electronic Signatures Act + Personal Data Protection Act",
    "signatureLevel": "Standard Electronic Signature"
  },
  "data": "base64_encrypted_data_with_nonce_and_wrapped_key"
}
```

**Version 6.0 (Single Jurisdiction - Taiwan):**
```json
{
  "version": "6.0",
  "jurisdiction": "TW",
  "data": "base64_encrypted_data_with_nonce_and_wrapped_key"
}
```

Encrypted data structure:
- Encryption Nonce (32 bytes) - random one-time nonce for key derivation
- Key IV (12 bytes) - for wrapping the random key
- Wrapped Key (48 bytes) - random encryption key, encrypted with write-only KEK
- Data IV (12 bytes) - for encrypting the actual data
- Encrypted Data (variable) - signature data encrypted with the random key

**Note**: The encryption nonce is generated once and stored with the encrypted data. The decryption key (derived from Sign-ID + nonce) has only 'decrypt' usage, making re-encryption impossible even if you decrypt the data successfully.

## 🛠️ Local Development

Simply open any HTML file in a web browser. No build process or server required.

```bash
# Clone the repository
git clone https://github.com/chengmatt416/e-signature.git

# Open in browser
open index.html
```

## 📝 License

MIT License - feel free to use for any purpose.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.