const fs = require('fs');
console.log(fs.readFileSync('decrypt.html', 'utf8').includes('deriveDecryptionKey(signId)'));
