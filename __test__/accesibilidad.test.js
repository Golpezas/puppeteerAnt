const puppeteer = require('puppeteer')
//const {AxePuppeteer} = require('@axe-core/puppeteer')

describe('Acceso', () => {

    let browser
    let page

    beforeEach(async() => {

        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        //const context = await browser.createIncognitoBrowserContext()
        page = await browser.newPage()

        //await page.setBypassCSP(true)

        await page.goto('https://platzi.com')//, {waitUntil: 'networkidle0'})

    },10000)

    afterEach(async() => {

        await browser.close()

    })

    test('Accesibilidad', async () => {

        await page.waitForSelector('img')
        const snapshot = await page.accessibility.snapshot()
        console.log(snapshot)

    }, 350000)

    /*test('Accesibilidad con axe', async () => {

        await page.waitForSelector('img')

        const result = await new AxePuppeteer(page).analyze()
        console.log(result)

    }, 350000)*/
  
})