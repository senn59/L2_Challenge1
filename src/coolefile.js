const puppeteer = require('puppeteer');
let pin = 1234;
let error = "Parse error: syntax error, unexpected '}', expecting variable (T_VARIABLE) or '{' or '$'  on line 26"
(async () => {
    const browser = await puppeteer.launch( {headless: false});
    const page = await browser.newPage();
    await page.goto('https://vista.benderal.nl');
    await page.type('input[id="voornaam"]', error, {delay: 0});
    await page.type('input[id="tv"]', error, {delay: 0});
    await page.type('input[id="achternaam"]', error, {delay: 0});
    await page.type('select[id="snummer"]', "1234", {delay: 0});
    await page.type('select[id="klas"]', "M42 D2", {delay: 0});
    await page.type('input[id="pin"]', pin, {delay: 0});
    await page.click("input[type=submit]")
    await browser.close();
})();