const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.goto('http://localhost:8000/index.html');
    console.log('Index loaded successfully.');

    await page.goto('http://localhost:8000/sign.html');
    console.log('Sign loaded successfully.');

    await page.goto('http://localhost:8000/decrypt.html');
    console.log('Decrypt loaded successfully.');

    await browser.close();
  } catch (e) {
    console.log('Puppeteer test error:', e);
  }
})();
