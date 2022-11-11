const puppeteer = require('puppeteer')
//import {KnownDevices}  from 'puppeteer'

//const tablet = KnownDevices['iPad Pro']
//const iphone = KnownDevices['iPhone X']

describe('Emulando dispositivo', () => {

    let browser
    let page

    beforeEach(async() => {

        browser = await puppeteer.launch({
            headless: false,
            //slowMo: 1000,
            //devtools: false,
            defaultViewport: null
        })

        //Para abrir el navegador en modo incognito
        //const context = await browser.createIncognitoBrowserContext()
        //page = await context.newPage()

        page = await browser.newPage()
        await page.goto('https://platzi.com', {waitUntil: 'networkidle0'})

    },10000)

    afterEach(async() => {

        await browser.close()

    })

    it('Emular dispositivos de forma manual', async () => {

        await page.emulate({
            name: 'Mi dispositivo',
            viewport: {
                width: 375,
                height: 667,
                deviceScaleFactor: 2,
                isMobile: true,
                hasTouch: true,
                isLandScape: false
            },
            userAgent: 'Mozilla/5.0 (Linux; Android 10; SAMSUNG SM-J600G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/10.1 Chrome/71.0.3578.99 Mobile Safari/537.36'
        })

        await page.waitForTimeout(3000)

    },350000)

    test('Emular sitio de escritorio', async () => {

        await page.setViewport({
            width: 1280,
            height: 800
        })

        await page.waitForTimeout(3000)

    },350000)

    test('Emular sitio en una tablet', async () => {

        //const tablet = KnownDevices['iPad Pro']

        //para emular la table de manera horizontal 
        //[iPad landscape]

        const tablet = puppeteer.devices['iPad Pro']
        
        await page.emulate(tablet)

        await page.waitForTimeout(3000)

    },350000)

    test('Emular sitio en celular', async () => {

        //const iphone = KnownDevices['iPhone X']

        const iPhone = puppeteer.devices['iPhone X']

        await page.emulate(iPhone)

        await page.waitForTimeout(3000)

    },350000)

})