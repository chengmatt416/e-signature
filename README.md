# E-Signature

A secure, client-side digital signature application that runs entirely in your browser. Create, encrypt, and verify digital signatures without sending any data to a server.

## 🚀 Features

- **✍️ Signature Canvas**: Draw your signature using mouse or touch
- **🔒 Enhanced Encryption**: All data encrypted with AES-256-GCM using user-provided passphrase and PBKDF2 key derivation
- **🛡️ Zero-Knowledge Security**: No hardcoded master keys - even source code owners cannot decrypt signatures without the passphrase
- **📅 Auto-Fill**: Automatically captures date, time, and device ID
- **🆔 Unique Sign-ID**: Each signature gets a unique identifier that acts as a salt for key derivation
- **💾 Export**: Download encrypted `.esig` files
- **✅ Verification**: Decrypt and verify signature authenticity with passphrase and Sign-ID
- **🔐 Privacy**: 100% client-side - no data sent to servers
- **🔑 Passphrase Protection**: User-controlled encryption - only you know the passphrase
- **📱 Progressive Web App**: Install on Android, iOS, or desktop for offline use
- **⚖️ Taiwan Legal Compliance**: Compliant with Taiwan's Electronic Signatures Act (電子簽章法)
- **🔒 Integrity Verification**: SHA-256 hash ensures signature and document integrity
- **👤 Signer Identity**: Captures signer's name, ID number, and contact information

## 📖 How to Use

### Creating a Signature

1. Open `sign.html`
2. Enter activation code from admin
3. **Fill in signer information** (required for Taiwan legal compliance):
   - Full Name (姓名)
   - National ID or Passport Number (身分證字號/護照號碼)
   - Email and Phone (optional)
4. **Set a strong encryption passphrase** (minimum 8 characters):
   - This passphrase will be required to decrypt the signature
   - Keep it secure and memorable - it cannot be recovered if lost
   - The passphrase is never stored anywhere
5. **Read and accept the legal notice** regarding Taiwan's Electronic Signatures Act
6. Draw your signature on the canvas
7. (Optional) Upload a document to be signed
8. System automatically fills:
   - Unique Sign-ID
   - Current date and time (ISO 8601 format)
   - Device fingerprint
9. Click "Save & Export" to download encrypted `.esig` file
10. **IMPORTANT**: Save both your Sign-ID and passphrase - both are required to decrypt the signature

### Decrypting a Signature

1. Open `decrypt.html`
2. Upload the `.esig` file
3. **Enter the Sign-ID** (required - acts as salt for key derivation)
4. **Enter the passphrase** used during signing
5. Click "Decrypt & Verify"
6. View signature details including:
   - Signer identity information
   - Signature image
   - Document integrity verification (if document was attached)
   - Legal compliance information
7. Download the signature image or attached document

**Note**: Without both the correct Sign-ID and passphrase, the signature cannot be decrypted. Even someone with access to the source code cannot decrypt signatures without these credentials.

## 🌐 GitHub Pages

Visit the live application: [https://chengmatt416.github.io/e-signature/](https://chengmatt416.github.io/e-signature/)

## 📱 Install as Web App (PWA)

E-Signature can be installed as a Progressive Web App on your mobile device or desktop for a native app-like experience!

### On Android (Chrome/Edge)

1. Visit [https://chengmatt416.github.io/e-signature/](https://chengmatt416.github.io/e-signature/)
2. Tap the menu (⋮) in the browser
3. Select "Install app" or "Add to Home screen"
4. Follow the prompts to install
5. The app will appear on your home screen and can be launched like a native app

### On iOS (Safari)

1. Visit [https://chengmatt416.github.io/e-signature/](https://chengmatt416.github.io/e-signature/)
2. Tap the Share button (⎋)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" to confirm
5. The app will appear on your home screen

### On Desktop (Chrome/Edge/Brave)

1. Visit [https://chengmatt416.github.io/e-signature/](https://chengmatt416.github.io/e-signature/)
2. Look for the install icon (⊕) in the address bar
3. Click "Install" in the prompt
4. The app will open in its own window and be added to your applications

**Benefits of installing as PWA:**
- Works offline after first visit
- Faster loading times
- Native app-like experience
- No app store required
- Automatic updates

## 🔧 Technical Details

### File Structure
- `index.html` - Landing page with information
- `sign.html` - Signature creation page
- `decrypt.html` - Signature decryption and verification page

### Security
- **Zero-Knowledge Architecture**: No hardcoded master keys in source code - encryption keys are derived from user passphrases
- All encryption/decryption happens client-side using JavaScript Web Crypto API
- **AES-256-GCM encryption** with PBKDF2 key derivation (100,000 iterations)
- User passphrase + Sign-ID = encryption key (passphrase is never stored)
- Sign-ID acts as a cryptographic salt for key derivation
- **Even source code owners cannot decrypt signatures** without the user's passphrase and Sign-ID
- No data transmission to external servers
- **SHA-256 hashing** ensures signature and document integrity
- **Timestamp in ISO 8601 format** for precise time recording
- Random IV (initialization vector) for each encryption ensures uniqueness

### Encryption Details
**Version 3.0 (Enhanced Security)**:
- **Algorithm**: AES-256-GCM (authenticated encryption)
- **Key Derivation**: PBKDF2 with SHA-256, 100,000 iterations
- **Salt**: Sign-ID (unique per signature)
- **Key Size**: 256 bits
- **Security Model**: Zero-knowledge - only the user with passphrase + Sign-ID can decrypt
- **Backward Compatibility**: Legacy v1.0 and v2.0 formats are no longer supported due to security concerns

### Taiwan Legal Compliance (電子簽章法)
This application complies with Taiwan's Electronic Signatures Act requirements:

1. **Signer Identification**: Captures signer's full name and national ID/passport number
2. **Signature Intent**: Requires explicit legal consent before signing
3. **Document Integrity**: Uses SHA-256 hash to ensure signature and documents remain unchanged
4. **Timestamp**: Records signature time in ISO 8601 format (Taiwan timezone: UTC+8)
5. **Non-repudiation**: Encrypted signature linked to signer's identity and unique Sign-ID
6. **Jurisdiction**: Clearly marked as Taiwan (TW) jurisdiction

**Legal Notice**: While this application implements technical requirements for Taiwan's Electronic Signatures Act, 
legal validity may vary depending on the specific use case and acceptance by relevant parties. For critical legal 
documents, consult with a legal professional.

### File Format (.esig)
Version 3.0 (Enhanced Security):
```json
{
  "version": "3.0",
  "jurisdiction": "TW",
  "data": "base64_encrypted_data_with_IV"
}
```

Encrypted data includes:
- Signer information (name, ID number, email, phone)
- Signature image and its SHA-256 hash
- Document (if attached) and its SHA-256 hash
- ISO 8601 timestamp
- Device ID and Sign-ID
- Legal consent flag
- Compliance metadata

**Note**: The encrypted data is protected by AES-256-GCM encryption using a key derived from the user's passphrase and Sign-ID. Without both, decryption is impossible.

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