const puppeteer = require('puppeteer')

describe('Captura de pantalla', () => {

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

    test('Captura de pantalla completa', async () => {

        await page.screenshot({

            path: './capturaPantalla.png',
            //aca le pasamos la pantalla completa
            fullPage: true

        })

    }, 350000)

    test('Captura de pantalla seleccionando un area', async () => {

        await page.screenshot({

            path: './capturaPantallaSelectArea.png',
            //aca le pasamos un area
            clip: {

                x: 0,
                y: 0,
                width: 500,
                height: 500

            }

        })

    }, 350000)

    test('Captura de pantalla fondo transparente', async () => {

        //aca le forsamos el estilo
        await page.evaluate(() => (document.body.style.background = 'transparent'))
        
        await page.screenshot({

            path: './capturaPantallatransparente.png',
            //esta funcion para asegurarnos q sea trasparente el fondo
            omitBackground: true

        })

    }, 350000)

    test('Captura de pantalla solo a un elemento', async () => {

        const elemnt = await page.waitForSelector('body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img')
        
        await elemnt.screenshot({

            path: './capturaPantallaElemento.png',
            //esta funcion para asegurarnos q sea trasparente el fondo
            

        })

    }, 350000)

})