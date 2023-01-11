const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

describe('Test messenger', function () {
    describe('Test load messages', () => {
        it('Load Message', async () => {
            const browser = await chromium.launch({ headless: false, slowMo: 500 });
            const page = await browser.newPage();
            await page.goto('http://127.0.0.1:5500/exercises/01.Messenger/index.html');
        })
    })
})