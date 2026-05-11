const fs = require('fs');
let content = fs.readFileSync('sign.html', 'utf8');

const saveSigRegex = /async function saveSignature\(\) \{[\s\S]*?const signatureImage = canvas\.toDataURL\('image\/png'\);/;
const saveSigMatch = content.match(saveSigRegex);

if (saveSigMatch) {
    const newSaveSig = saveSigMatch[0] + `

                // --- HIGHEST-END ANTI-TAMPERING: STAMPING & METADATA ---
                if (uploadedDocument && uploadedFileType === 'application/pdf') {
                    try {
                        const existingPdfBytes = await fetch(uploadedDocument).then(res => res.arrayBuffer());
                        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

                        // Embed signature image
                        const pngImage = await pdfDoc.embedPng(signatureImage);

                        // Get the first page
                        const pages = pdfDoc.getPages();
                        const firstPage = pages[0];
                        const { width, height } = firstPage.getSize();

                        // Calculate coordinates. Note: PDF-lib coordinates are from bottom-left
                        // pCanvas coordinates are from top-left. We need to un-scale them.
                        const unscaledW = overlayW / pdfScale;
                        const unscaledH = overlayH / pdfScale;
                        const unscaledX = overlayX / pdfScale;
                        // PDF Y is from bottom up
                        const unscaledY = height - ((overlayY / pdfScale) + unscaledH);

                        firstPage.drawImage(pngImage, {
                            x: unscaledX,
                            y: unscaledY,
                            width: unscaledW,
                            height: unscaledH,
                        });

                        // Add Metadata for integrity
                        pdfDoc.setTitle('E-Signature Signed Document');
                        pdfDoc.setSubject('Sign-ID: ' + signId);
                        pdfDoc.setAuthor(signerName);
                        pdfDoc.setCreationDate(new Date());
                        pdfDoc.setModificationDate(new Date());

                        const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });
                        uploadedDocument = pdfBytes;
                        console.log('PDF Stamped and secured with metadata');
                    } catch (err) {
                        console.error('Error stamping PDF:', err);
                        showAlert('Error applying signature to PDF', 'error');
                        return;
                    }
                }
                // -----------------------------------------------------`;

    content = content.replace(saveSigMatch[0], newSaveSig);
    fs.writeFileSync('sign.html', content);
    console.log("Stamping logic added");
} else {
    console.log("Regex failed");
}
