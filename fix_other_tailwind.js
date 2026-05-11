const fs = require('fs');

// DECRYPT.HTML
let decryptContent = fs.readFileSync('decrypt.html', 'utf8');
decryptContent = decryptContent.replace(/<style>[\s\S]*?<\/style>/, `
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .lang-toggle {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            border: 2px solid #ec4899;
            border-radius: 8px;
            padding: 8px 16px;
            cursor: pointer;
            font-weight: 600;
            color: #ec4899;
            transition: all 0.3s;
            font-size: 0.9em;
            z-index: 50;
        }

        .lang-toggle:hover {
            background: #ec4899;
            color: white;
        }

        @media (max-width: 600px) {
            .lang-toggle {
                position: fixed;
                top: 10px;
                right: 10px;
                padding: 6px 12px;
                font-size: 0.8em;
                z-index: 1000;
            }
        }
        #fileInput { display: none; }
    </style>
`);
decryptContent = decryptContent.replace(/<body>/, '<body class="bg-gradient-to-br from-indigo-600 to-purple-700 min-h-screen flex flex-col items-center justify-center p-4 font-sans text-gray-800">');
decryptContent = decryptContent.replace(/<div class="container">/, '<div class="bg-white rounded-2xl shadow-2xl p-6 md:p-12 max-w-4xl w-full text-center relative">');
decryptContent = decryptContent.replace(/<div class="upload-section" id="uploadSection"[^>]*>/, '<div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-pink-500 hover:bg-pink-50 transition-all cursor-pointer mb-6" id="uploadSection" onclick="document.getElementById(\'fileInput\').click()">');
decryptContent = decryptContent.replace(/<input type="text" id="signIdInput"[^>]*>/, '<input type="text" id="signIdInput" class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all outline-none font-mono" data-placeholder-en="Enter your Sign ID (e.g., SIG-1234567890-ABC123)" data-placeholder-zh="輸入您的簽章編號（例如：SIG-1234567890-ABC123）" placeholder="Enter your Sign ID (e.g., SIG-1234567890-ABC123)" required>');
decryptContent = decryptContent.replace(/<button class="btn-primary" onclick="decryptSignature\(\)"[^>]*>.*<\/button>/, '<button class="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition-all w-full md:w-auto" onclick="decryptSignature()" data-en="Decrypt & Verify" data-zh="解密並驗證">Decrypt & Verify</button>');
decryptContent = decryptContent.replace(/<button class="btn-secondary" onclick="reset\(\)"[^>]*>.*<\/button>/, '<button class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-xl transition-all w-full md:w-auto" onclick="reset()" data-en="Reset" data-zh="重設">Reset</button>');
fs.writeFileSync('decrypt.html', decryptContent);

// ADMIN.HTML
let adminContent = fs.readFileSync('admin.html', 'utf8');
adminContent = adminContent.replace(/<style>[\s\S]*?<\/style>/, `
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .login-section.hidden { display: none; }
        .admin-section { display: none; }
        .admin-section.show { display: block; }
        .activation-code-display.hidden { display: none; }
        #alert { display: none; }
        #alert.show { display: block; }
    </style>
`);
adminContent = adminContent.replace(/<body>/, '<body class="bg-gradient-to-br from-indigo-600 to-purple-700 min-h-screen flex items-center justify-center p-4 font-sans text-gray-800">');
adminContent = adminContent.replace(/<div class="container">/, '<div class="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center relative">');
adminContent = adminContent.replace(/<input type="password" id="passcodeInput"[^>]*>/, '<input type="password" id="passcodeInput" class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none" placeholder="Enter admin passcode">');
adminContent = adminContent.replace(/<div class="code-item">/g, '<div class="bg-gray-50 p-4 rounded-lg flex justify-between items-center border-l-4 border-orange-500 mb-3 shadow-sm">');
adminContent = adminContent.replace(/<button class="btn-primary" onclick="login\(\)">Login<\/button>/, '<button class="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all w-full md:w-auto" onclick="login()">Login</button>');
adminContent = adminContent.replace(/<button class="btn-secondary" onclick="goHome\(\)">Back to Home<\/button>/, '<button class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-xl transition-all w-full md:w-auto" onclick="goHome()">Back to Home</button>');
adminContent = adminContent.replace(/<button class="btn-primary" onclick="generateActivationCode\(\)">Generate New Code<\/button>/, '<button class="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all w-full" onclick="generateActivationCode()">Generate New Code</button>');
adminContent = adminContent.replace(/<button class="btn-success" onclick="copyCode\(\)">Copy Code<\/button>/, '<button class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all w-full" onclick="copyCode()">Copy Code</button>');
adminContent = adminContent.replace(/<button class="btn-secondary" onclick="logout\(\)">Logout<\/button>/, '<button class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-xl transition-all w-full" onclick="logout()">Logout</button>');
fs.writeFileSync('admin.html', adminContent);
