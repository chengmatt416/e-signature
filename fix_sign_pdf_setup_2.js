const fs = require('fs');
let content = fs.readFileSync('sign.html', 'utf8');

// The replacement failed, let's do it manually using git diff logic via script
// Delete the broken block and insert it correctly
const brokenBlock = `        <div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer mb-6" id="documentUploadSection" onclick="handleUploadClick(event)">
            <div class="upload-icon">📄</div>

        <div id="pdfPreviewContainer" class="relative hidden mt-6 border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 mb-6 w-full" style="min-height: 400px; display: none;">
            <canvas id="pdfCanvas" class="w-full"></canvas>
            <div id="signatureOverlay" class="absolute hidden border-2 border-dashed border-indigo-500 cursor-move bg-white/50 backdrop-blur-sm shadow-lg z-10" style="display: none; width: 150px; height: 50px;">
                <img id="overlayImage" class="w-full h-full pointer-events-none" />
                <div id="resizeHandle" class="absolute bottom-0 right-0 w-6 h-6 bg-indigo-500 cursor-se-resize rounded-tl-lg shadow-md flex items-center justify-center text-white text-xs">⤡</div>
            </div>
        </div>
            <div class="upload-text" data-en="Optional: Upload Any File to Sign" data-zh="選填：上傳要簽署的檔案">Optional: Upload Any File to Sign</div>
            <div class="upload-subtext" data-en="Click to upload any file that will be encrypted with your signature" data-zh="點擊上傳要與簽章一起加密的檔案">Click to upload any file that will be encrypted with your signature</div>
            <input type="file" id="documentFileInput">
            <button id="viewFileBtn" class="file-preview-btn" style="display: none;" onclick="viewUploadedFile(event)" data-en="👁️ View File" data-zh="👁️ 檢視檔案">👁️ View File</button>
        </div>`;

const fixedBlock = `        <div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer mb-6" id="documentUploadSection" onclick="handleUploadClick(event)">
            <div class="upload-icon">📄</div>
            <div class="upload-text" data-en="Optional: Upload Any File to Sign" data-zh="選填：上傳要簽署的檔案">Optional: Upload Any File to Sign</div>
            <div class="upload-subtext" data-en="Click to upload any file that will be encrypted with your signature" data-zh="點擊上傳要與簽章一起加密的檔案">Click to upload any file that will be encrypted with your signature</div>
            <input type="file" id="documentFileInput">
            <button id="viewFileBtn" class="file-preview-btn" style="display: none;" onclick="viewUploadedFile(event)" data-en="👁️ View File" data-zh="👁️ 檢視檔案">👁️ View File</button>
        </div>

        <div id="pdfPreviewContainer" class="relative mt-6 border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 mb-6 w-full" style="display: none;">
            <canvas id="pdfCanvas" class="w-full"></canvas>
            <div id="signatureOverlay" class="absolute border-2 border-dashed border-indigo-500 cursor-move bg-white/50 backdrop-blur-sm shadow-lg z-10" style="display: none; width: 150px; height: 50px;">
                <img id="overlayImage" class="w-full h-full pointer-events-none" />
                <div id="resizeHandle" class="absolute bottom-0 right-0 w-6 h-6 bg-indigo-500 cursor-se-resize rounded-tl-lg shadow-md flex items-center justify-center text-white text-xs">⤡</div>
            </div>
        </div>`;

content = content.replace(brokenBlock, fixedBlock);
fs.writeFileSync('sign.html', content);
