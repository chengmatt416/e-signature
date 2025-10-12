# E-Signature

A secure, client-side digital signature application that runs entirely in your browser. Create, encrypt, and verify digital signatures without sending any data to a server.

## 🚀 Features

- **✍️ Signature Canvas**: Draw your signature using mouse or touch
- **🔒 Encryption**: All data encrypted with a secure master key
- **📅 Auto-Fill**: Automatically captures date, time, and device ID
- **🆔 Unique Sign-ID**: Each signature gets a unique identifier for tracking
- **💾 Export**: Download encrypted `.esig` files
- **✅ Verification**: Decrypt and verify signature authenticity
- **🔐 Privacy**: 100% client-side - no data sent to servers

## 📖 How to Use

### Creating a Signature

1. Open `sign.html`
2. Draw your signature on the canvas
3. System automatically fills:
   - Unique Sign-ID
   - Current date and time
   - Device fingerprint
4. Click "Save & Export" to download encrypted `.esig` file
5. Save your Sign-ID for future verification

### Decrypting a Signature

1. Open `decrypt.html`
2. Upload the `.esig` file
3. (Optional) Enter the Sign-ID for verification
4. Click "Decrypt & Verify"
5. View signature details and download the signature image

## 🌐 GitHub Pages

Visit the live application: [https://chengmatt416.github.io/e-signature/](https://chengmatt416.github.io/e-signature/)

## 🔧 Technical Details

### File Structure
- `index.html` - Landing page with information
- `sign.html` - Signature creation page
- `decrypt.html` - Signature decryption and verification page

### Security
- All encryption/decryption happens client-side using JavaScript
- Data is encrypted using XOR cipher with a master key
- Sign-ID provides additional verification layer
- No data transmission to external servers

### File Format (.esig)
```json
{
  "version": "1.0",
  "signId": "SIG-TIMESTAMP-RANDOM",
  "data": "base64_encrypted_data"
}
```

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