const puppeteer = require('puppeteer')
const {toMatchImageSnapshot} = require('jest-image-snapshot')

//esto es para hacerlo mas poderoso
expect.extend({toMatchImageSnapshot})

describe('Visual test', () => {

    let browser
    let page

    beforeEach(async() => {

        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        const context = await browser.createIncognitoBrowserContext()
        page = await browser.newPage()
        await page.goto('https://google.com', {waitUntil: 'networkidle0'})

    },10000)

    afterEach(async() => {

        await browser.close()

    })

    //crea una captura de pantalla de toda la pagina
    //y la tiene como  referencia si algo cambia 
    //el test dara error
    test('Snapshot de toda la pagina', async () => {

        await page.waitForSelector('img')

        const screenshot = await page.screenshot()

        expect(screenshot).toMatchImageSnapshot()

    }, 350000)

    test('Snapshot de solo un elemento', async () => {

        const image = await page.waitForSelector('img')

        const screenshot = await image.screenshot()

        expect(screenshot).toMatchImageSnapshot({

            failureThreshold: 0.05,
            failureThresholdType : 'percent'

        })

    }, 350000)

    test('Snapshot de un dispositivo', async () => {

        const tablet = puppeteer.devices['iPad Pro']
        await page.emulate(tablet)

        await page.waitForSelector('img')

        const screenshot = await page.screenshot()

        expect(screenshot).toMatchImageSnapshot({

            failureThreshold: 0.05,
            failureThresholdType : 'percent'

        })

    }, 350000)

    test('Remover imagen antes de crear un Snapshot', async () => {

        //para validar todo menos un banner o una imagen
        //que esta en constante cambio
        await page.waitForSelector('img')

        await page.evaluate(() => (document.querySelectorAll('img') || []).forEach((img) => img.remove()))

        const screenshot = await page.screenshot()

        expect(screenshot).toMatchImageSnapshot({

            failureThreshold: 0.05,
            failureThresholdType : 'percent'

        })

    }, 350000)

})