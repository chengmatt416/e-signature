const fs = require('fs');
let content = fs.readFileSync('sign.html', 'utf8');

// replace buttons and canvas
content = content.replace(/<canvas id="signatureCanvas"[^>]*><\/canvas>/, '<canvas id="signatureCanvas" class="border-2 border-gray-200 rounded-xl cursor-crosshair w-full h-[300px] bg-white touch-none shadow-inner"></canvas>');
content = content.replace(/<button class="btn-primary" onclick="saveSignature\(\)"[^>]*>.*<\/button>/, '<button class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all w-full md:w-auto" onclick="saveSignature()" data-en="Save & Export" data-zh="儲存並匯出">Save & Export</button>');
content = content.replace(/<button class="btn-secondary" onclick="clearSignature\(\)"[^>]*>.*<\/button>/, '<button class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-xl transition-all w-full md:w-auto" onclick="clearSignature()" data-en="Clear" data-zh="清除">Clear</button>');

fs.writeFileSync('sign.html', content);
