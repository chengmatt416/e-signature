const fs = require('fs');
let content = fs.readFileSync('sign.html', 'utf8');

const additionalScript = `
        let pdfDocProxy = null;
        let pdfPageProxy = null;
        let pdfScale = 1;
        let overlayX = 50;
        let overlayY = 50;
        let overlayW = 150;
        let overlayH = 50;

        const overlayDiv = document.getElementById('signatureOverlay');
        const overlayImg = document.getElementById('overlayImage');
        const resizeHandle = document.getElementById('resizeHandle');
        const pdfContainer = document.getElementById('pdfPreviewContainer');
        const pCanvas = document.getElementById('pdfCanvas');
        const pCtx = pCanvas.getContext('2d');

        let isDraggingOverlay = false;
        let isResizingOverlay = false;
        let startX, startY;

        // Overlay Mouse/Touch Events
        overlayDiv.addEventListener('mousedown', (e) => {
            if (e.target === resizeHandle) {
                isResizingOverlay = true;
            } else {
                isDraggingOverlay = true;
            }
            startX = e.clientX;
            startY = e.clientY;
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (isDraggingOverlay) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                overlayX += dx;
                overlayY += dy;
                // Boundaries
                overlayX = Math.max(0, Math.min(overlayX, pCanvas.offsetWidth - overlayW));
                overlayY = Math.max(0, Math.min(overlayY, pCanvas.offsetHeight - overlayH));
                overlayDiv.style.left = overlayX + 'px';
                overlayDiv.style.top = overlayY + 'px';
                startX = e.clientX;
                startY = e.clientY;
            } else if (isResizingOverlay) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                overlayW = Math.max(50, overlayW + dx);
                overlayH = Math.max(20, overlayH + dy);
                overlayDiv.style.width = overlayW + 'px';
                overlayDiv.style.height = overlayH + 'px';
                startX = e.clientX;
                startY = e.clientY;
            }
        });

        window.addEventListener('mouseup', () => {
            isDraggingOverlay = false;
            isResizingOverlay = false;
        });

        // Touch events mapping
        overlayDiv.addEventListener('touchstart', (e) => {
            if (e.target === resizeHandle) isResizingOverlay = true;
            else isDraggingOverlay = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, {passive: false});

        window.addEventListener('touchmove', (e) => {
            if (!isDraggingOverlay && !isResizingOverlay) return;
            e.preventDefault();
            const clientX = e.touches[0].clientX;
            const clientY = e.touches[0].clientY;
            if (isDraggingOverlay) {
                overlayX += clientX - startX;
                overlayY += clientY - startY;
                overlayX = Math.max(0, Math.min(overlayX, pCanvas.offsetWidth - overlayW));
                overlayY = Math.max(0, Math.min(overlayY, pCanvas.offsetHeight - overlayH));
                overlayDiv.style.left = overlayX + 'px';
                overlayDiv.style.top = overlayY + 'px';
            } else if (isResizingOverlay) {
                overlayW = Math.max(50, overlayW + (clientX - startX));
                overlayH = Math.max(20, overlayH + (clientY - startY));
                overlayDiv.style.width = overlayW + 'px';
                overlayDiv.style.height = overlayH + 'px';
            }
            startX = clientX;
            startY = clientY;
        }, {passive: false});

        window.addEventListener('touchend', () => {
            isDraggingOverlay = false;
            isResizingOverlay = false;
        });

        // Whenever drawing finishes, update the overlay image
        canvas.addEventListener('mouseup', updateOverlayImage);
        canvas.addEventListener('touchend', updateOverlayImage);

        function updateOverlayImage() {
            if (hasSignature && uploadedFileType === 'application/pdf') {
                overlayImg.src = canvas.toDataURL('image/png');
                overlayDiv.style.display = 'block';
            } else {
                overlayDiv.style.display = 'none';
            }
        }

        async function renderPDF(dataUrl) {
            try {
                pdfContainer.style.display = 'block';
                const loadingTask = pdfjsLib.getDocument(dataUrl);
                pdfDocProxy = await loadingTask.promise;
                pdfPageProxy = await pdfDocProxy.getPage(1);

                // Scale to fit container width
                const containerWidth = pdfContainer.clientWidth || 800;
                const unscaledViewport = pdfPageProxy.getViewport({ scale: 1.0 });
                pdfScale = containerWidth / unscaledViewport.width;
                const viewport = pdfPageProxy.getViewport({ scale: pdfScale });

                pCanvas.width = viewport.width;
                pCanvas.height = viewport.height;

                const renderContext = {
                    canvasContext: pCtx,
                    viewport: viewport
                };
                await pdfPageProxy.render(renderContext).promise;

                // Intelligent Feature: Keyword extraction
                const textContent = await pdfPageProxy.getTextContent();
                const keywords = ['signature', 'sign here', '簽名', '簽章'];
                let foundKeyword = false;

                for (let item of textContent.items) {
                    const str = item.str.toLowerCase();
                    if (keywords.some(k => str.includes(k))) {
                        // Position overlay near keyword
                        const transform = pdfjsLib.Util.transform(viewport.transform, item.transform);
                        overlayX = transform[4]; // x
                        overlayY = transform[5] - 40; // y (move up slightly)

                        // Ensure bounds
                        overlayX = Math.max(0, Math.min(overlayX, pCanvas.offsetWidth - overlayW));
                        overlayY = Math.max(0, Math.min(overlayY, pCanvas.offsetHeight - overlayH));
                        foundKeyword = true;
                        break;
                    }
                }

                if (!foundKeyword) {
                    // Default bottom right
                    overlayX = pCanvas.offsetWidth - overlayW - 50;
                    overlayY = pCanvas.offsetHeight - overlayH - 50;
                }

                overlayDiv.style.left = overlayX + 'px';
                overlayDiv.style.top = overlayY + 'px';

                updateOverlayImage();
            } catch (err) {
                console.error('Error rendering PDF:', err);
                showAlert('Error loading PDF preview', 'error');
            }
        }
`;

const handleSelectRegex = /function handleDocumentSelect\(e\) \{[\s\S]*?reader\.readAsDataURL\(file\);\s*\}/;
const handleSelectMatch = content.match(handleSelectRegex);

if (handleSelectMatch) {
    const newHandleSelect = handleSelectMatch[0].replace(
        /uploadedFileType = file\.type;\s*const uploadText = documentUploadSection\.querySelector\('\.upload-text'\);\s*uploadText\.textContent = '✓ ' \+ file\.name;/,
        `uploadedFileType = file.type;
                    const uploadText = documentUploadSection.querySelector('.upload-text');
                    uploadText.textContent = '✓ ' + file.name;

                    if (file.type === 'application/pdf') {
                        renderPDF(event.target.result);
                    } else {
                        pdfContainer.style.display = 'none';
                        overlayDiv.style.display = 'none';
                    }`
    );

    // Inject scripts right before // Document file upload handling
    content = content.replace(/\/\/ Document file upload handling/, additionalScript + '\n        // Document file upload handling');
    content = content.replace(handleSelectMatch[0], newHandleSelect);
    fs.writeFileSync('sign.html', content);
    console.log('PDF logic injected');
} else {
    console.log('Regex failed');
}
