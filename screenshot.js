const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.goto('http://localhost:8000/index.html');
    await page.screenshot({path: 'index.png', fullPage: true});
    console.log('Index screenshot taken.');

    await page.goto('http://localhost:8000/sign.html');
    await page.screenshot({path: 'sign.png', fullPage: true});
    console.log('Sign screenshot taken.');

    await page.goto('http://localhost:8000/decrypt.html');
    await page.screenshot({path: 'decrypt.png', fullPage: true});
    console.log('Decrypt screenshot taken.');

    await page.goto('http://localhost:8000/admin.html');
    await page.screenshot({path: 'admin.png', fullPage: true});
    console.log('Admin screenshot taken.');

    await browser.close();
  } catch (e) {
    console.log('Puppeteer test error:', e);
  }
})();
