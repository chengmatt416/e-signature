const fs = require('fs');
let content = fs.readFileSync('decrypt.html', 'utf8');

const regex = /\/\/ Derive decryption key from Sign-ID only\s*async function deriveDecryptionKey\(signId\) \{\s*const encoder = new TextEncoder\(\);\s*\/\/ Decryption only needs Sign-ID\s*const decryptionSeed = signId;\s*const keyMaterial = await crypto\.subtle\.importKey\(\s*'raw',\s*encoder\.encode\(decryptionSeed\),\s*'PBKDF2',\s*false,/;

if (regex.test(content)) {
    console.log("Match found");
    const replacement = `// Derive decryption key from Sign-ID only
        async function deriveDecryptionKeyV4(signId) {
            const encoder = new TextEncoder();

            // Decryption only needs Sign-ID
            const decryptionSeed = signId;

            const keyMaterial = await crypto.subtle.importKey(
                'raw',
                encoder.encode(decryptionSeed),
                'PBKDF2',
                false,
                ['deriveBits', 'deriveKey']
            );

            const key = await crypto.subtle.deriveKey(
                {
                    name: 'PBKDF2',
                    salt: encoder.encode('wrap-key-v6'),
                    iterations: 100000,
                    hash: 'SHA-256'
                },
                keyMaterial,
                { name: 'AES-GCM', length: 256 },
                false,
                ['decrypt']
            );

            return key;
        }`;
    content = content.replace(regex, replacement);
    fs.writeFileSync('decrypt.html', content);
    console.log("Replaced");
} else {
    console.log("No match");
}
