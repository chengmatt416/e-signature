const fs = require('fs');
let content = fs.readFileSync('sign.html', 'utf8');

// Replace custom CSS styles block with Tailwind script
content = content.replace(/<style>[\s\S]*?<\/style>/, `
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .lang-toggle {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            border: 2px solid #4f46e5;
            border-radius: 8px;
            padding: 8px 16px;
            cursor: pointer;
            font-weight: 600;
            color: #4f46e5;
            transition: all 0.3s;
            font-size: 0.9em;
            z-index: 50;
        }

        .lang-toggle:hover {
            background: #4f46e5;
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

        #documentFileInput {
            display: none;
        }

        #signatureCanvas {
            touch-action: none;
        }
    </style>
`);

// update body and container
content = content.replace(/<body>/, '<body class="bg-gradient-to-br from-indigo-600 to-purple-700 min-h-screen flex flex-col items-center justify-center p-4 font-sans text-gray-800">');
content = content.replace(/<div class="container">/, '<div class="bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-4xl w-full relative">');

// Update inputs
content = content.replace(/<input type="text" id="signerName"[^>]*>/g, '<input type="text" id="signerName" class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" data-placeholder-en="Enter your full name" data-placeholder-zh="輸入您的全名" placeholder="Enter your full name" required>');
content = content.replace(/<input type="text" id="signerIdNumber"[^>]*>/g, '<input type="text" id="signerIdNumber" class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" data-placeholder-en="e.g., A123456789" data-placeholder-zh="例如：A123456789" placeholder="e.g., A123456789" required>');
content = content.replace(/<input type="email" id="signerEmail"[^>]*>/g, '<input type="email" id="signerEmail" class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" data-placeholder-en="your.email@example.com" data-placeholder-zh="您的電子郵件@example.com" placeholder="your.email@example.com">');
content = content.replace(/<input type="tel" id="signerPhone"[^>]*>/g, '<input type="tel" id="signerPhone" class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" data-placeholder-en="+886-912-345-678" data-placeholder-zh="+886-912-345-678" placeholder="+886-912-345-678">');
content = content.replace(/<select id="jurisdiction"[^>]*>/g, '<select id="jurisdiction" class="w-full p-4 border-2 border-blue-400 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white cursor-pointer" onchange="updateJurisdictionInfo()">');

// update upload section
content = content.replace(/<div class="upload-section" id="documentUploadSection"[^>]*>/, '<div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer mb-6" id="documentUploadSection" onclick="handleUploadClick(event)">');

fs.writeFileSync('sign.html', content);
