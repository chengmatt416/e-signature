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

**Note**: Only the Sign-ID is needed to decrypt. The encryption process uses additional hidden entropy (device ID + timestamp) that makes it impossible to re-encrypt even with the decryption key.

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
- **Random-Key Encryption**: Each signature uses a completely random 256-bit encryption key
- **No Relationship with Sign-ID**: Encryption key is randomly generated, changes every time
- All encryption/decryption happens client-side using JavaScript Web Crypto API
- **AES-256-GCM encryption** with PBKDF2 key derivation (100,000 iterations)
- **Key Wrapping**: Random encryption key is encrypted with Sign-ID-derived key
- **Decryption with Sign-ID**: Sign-ID decrypts the wrapped key, which then decrypts the data
- No data transmission to external servers
- **SHA-256 hashing** ensures signature and document integrity
- **Timestamp in ISO 8601 format** for precise time recording
- Random IV (initialization vector) for each encryption ensures uniqueness

### Encryption Details
**Version 5.0 (Random-Key Encryption)**:
- **Algorithm**: AES-256-GCM (authenticated encryption)
- **Data Encryption Key**: Completely random, generated fresh for each signature
- **Key Wrapping**: PBKDF2 with SHA-256, 100,000 iterations
- **Key Encryption Key**: Derived from Sign-ID only
- **Key Size**: 256 bits for both data and key-encryption keys
- **Security Model**: Random encryption key has no relationship with Sign-ID, changes every time
- **Backward Compatibility**: Legacy v1.0, v2.0, v3.0, and v4.0 formats are no longer supported

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
Version 5.0 (Random-Key Encryption):
```json
{
  "version": "5.0",
  "jurisdiction": "TW",
  "data": "base64_encrypted_data_with_wrapped_key"
}
```

Encrypted data structure:
- Key IV (12 bytes) - for wrapping the random key
- Wrapped Key (48 bytes) - random encryption key, encrypted with Sign-ID-derived key
- Data IV (12 bytes) - for encrypting the actual data
- Encrypted Data (variable) - signature data encrypted with the random key

**Note**: The random encryption key is different for every signature and has no relationship with the Sign-ID. The Sign-ID is only used to decrypt the wrapped key.

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