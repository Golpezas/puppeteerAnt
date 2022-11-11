const puppeteer = require('puppeteer')
const fs = require('fs')

describe('Acceso', () => {

    let browser
    let page

    beforeEach(async() => {

        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        })

        page = await browser.newPage()

        //await page.goto('https://platzi.com', {waitUntil: 'networkidle0'})

    },10000)

    afterEach(async() => {

        await browser.close()

    })

    test('Medir performance automatizacion', async () => {

        await page.goto('https://platzi.com')

        await page.waitForSelector('img')
        const metrics = await page.metrics()
        console.log(metrics)

    }, 350000)

    test('Medir performance de la pagina', async () => {

        await page.goto('https://platzi.com')
        
        await page.waitForSelector('img')
        const metrics2 = await page.evaluate(() => JSON.stringify(window.performance))
        console.log(metrics2)

    }, 350000)

    test('Medir performance load pagina', async () => {

        await page.tracing.start({path: 'profile.json'})
        await page.goto('https://platzi.com')
        await page.tracing.stop()

    }, 350000)

    test('Medir performance load pagina con screenshots', async () => {

        await page.tracing.start({path: 'profile.json', screenshot: true})
        await page.goto('https://platzi.com')
        await page.tracing.stop()

    }, 350000)

    test('Medir performance load pagina con screenshots y extraccion', async () => {

        await page.tracing.start({path: 'profile.json', screenshot: true})
        await page.goto('https://platzi.com')
        await page.tracing.stop()
        const tracing = JSON.parse(fs.readFileSync('./profile.json', 'utf8'))
        //filtrar el JSON
        const traceScreenShots = tracing.traceEvents.filter(

            (x) =>

            x.cat === 'disabled-by-default-devtools.screenshot' &&
            x.name === 'Screenshot' &&
            typeof x.args !== 'undefined' &&
            typeof x.args.snapshot !== 'undefined'
            

        )

        //iterar sobre este arrglo para crear las imagenes

        traceScreenShots.forEach(function(snap, index){

            fs.writeFile(`trace-screenshot-${index}.png`, snap.args.snapshot, 'base64', function(err){})

            if (err) {
                console.log('No pude crear el archivo', err)
            }

        })

    }, 350000)

    test('Medir performance first paint y first contentful paint', async () => {

        const navigationPromise = page .waitForNavigation()
        await page.goto('https://platzi.com')
        await navigationPromise

        const firstPaint = JSON.parse(
            await page.evaluate( ()=> JSON.stringify(performance.getEntriesByName('first-paint')))
        )

        const firstContentfulPaint = JSON.parse(
            await page.evaluate( ()=> JSON.stringify(performance.getEntriesByName('first-contentful-paint')))
        )

        console.log('firstPaint', firstPaint[0].startTime)
        console.log('firstContentfulPaint', firstContentfulPaint[0].startTime)
        
    }, 350000)

    test('Medir performance frames por segundo', async () => {

        const devtoolsProtocolClient = await page.target().createCDPSession()
        await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', {show: true})
        await page.goto('https://platzi.com')

        await page.screenshot({path: 'framesPorSegundo.jpg', type: 'jpeg'})
        
    }, 350000)

})