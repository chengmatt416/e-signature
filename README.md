# E-Signature

A secure, client-side digital signature application that runs entirely in your browser. Create, encrypt, and verify digital signatures without sending any data to a server.

## 🚀 Features

- **✍️ Signature Canvas**: Draw your signature using mouse or touch
- **🔒 Encryption**: All data encrypted with a secure master key combined with Sign-ID
- **📅 Auto-Fill**: Automatically captures date, time, and device ID
- **🆔 Unique Sign-ID**: Each signature gets a unique identifier that acts as a decryption key
- **💾 Export**: Download encrypted `.esig` files
- **✅ Verification**: Decrypt and verify signature authenticity
- **🔐 Privacy**: 100% client-side - no data sent to servers
- **🔑 Sign-ID Privacy**: Sign-ID is encrypted and only known to the signer

## 📖 How to Use

### Creating a Signature

1. Open `sign.html`
2. Draw your signature on the canvas
3. System automatically fills:
   - Unique Sign-ID
   - Current date and time
   - Device fingerprint
4. Click "Save & Export" to download encrypted `.esig` file
5. **IMPORTANT**: Save your Sign-ID - it's required to decrypt the signature and is not stored in the file

### Decrypting a Signature

1. Open `decrypt.html`
2. Upload the `.esig` file
3. **Enter the Sign-ID** (required - acts as decryption key)
4. Click "Decrypt & Verify"
5. View signature details and download the signature image

**Note**: Without the correct Sign-ID, the signature cannot be decrypted.

## 🌐 GitHub Pages

Visit the live application: [https://chengmatt416.github.io/e-signature/](https://chengmatt416.github.io/e-signature/)

## 🔧 Technical Details

### File Structure
- `index.html` - Landing page with information
- `sign.html` - Signature creation page
- `decrypt.html` - Signature decryption and verification page

### Security
- All encryption/decryption happens client-side using JavaScript
- Data is encrypted using XOR cipher with a master key combined with the Sign-ID
- Sign-ID is **not stored in plaintext** in the file - it acts as the decryption key
- Only the person who signed knows the Sign-ID
- No data transmission to external servers

### File Format (.esig)
```json
{
  "version": "1.0",
  "data": "base64_encrypted_data"
}
```

**Note**: The Sign-ID is **not** stored in the file. It exists only in the encrypted data and must be provided by the user to decrypt.

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