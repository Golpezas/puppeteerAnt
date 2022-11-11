const puppeteer = require('puppeteer')

describe('Geolocalizacion', () => {

    let browser
    let page

    beforeEach(async() => {

        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        //const context = await browser.createIncognitoBrowserContext()
        page = await browser.newPage()
        //await page.goto('https://platzi.com', {waitUntil: 'networkidle0'})

    },10000)

    afterEach(async() => {

        await browser.close()

    })

    test('Cambio Geolocalizacion', async () => {

        const context = browser.defaultBrowserContext()

        await context.overridePermissions('https://chercher.tech/practice/geo-location.html', [
            'geolocation'
        ])

        await page.setGeolocation({latitude: 90, longitude: 20})
        
        await page.goto('https://chercher.tech/practice/geo-location.html')

    }, 350000)

    

})