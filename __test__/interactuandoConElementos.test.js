const puppeteer = require('puppeteer')
const {click, type, doubleClick} = require('../lib/helpers')

describe('2do test', () => {

    it('Debe interactuar con elementos', async () => {
        
        const browser = await puppeteer.launch({
            headless: false,
            //slowMo: 1000,
            //devtools: false,
            defaultViewport: null
        })

        const page = await browser.newPage()
        await page.goto('https://demo.guru99.com/test/simple_context_menu.html')
        
        //este codigo sirve para los formilarios, alertas
        //para darle aceptar o ok y puedas seguir        
        page.on('dialog', async (dialog) => {
            await dialog.accept()
        })

        //click derecho
        //await page.click('#authentication > span', {button: 'right', delay: 500})
        //await page.waitForTimeout(3000)

        //doble click
        //await page.click('#authentication > button', {clickCount: 2, delay: 100})
        await doubleClick(page, '#authentication > button')
        
        //await page.waitForTimeout(200)

        await page.goto('https://devexpress.github.io/testcafe/example/')

        //este delay se coloca para simular el tiempo de un usario
        await type(page, '#developer-name', 'Antonio', {delay: 100})
        
        await click(page, '#remote-testing')

        //para seleccionar una opcion de un menu emergente
        await page.select('#preferred-interface', "Both")

        await click(page, '#tried-test-cafe')
        await type(page, '#comments','Esto es una prueba')
        await click(page, '#submit-button')
        

        await browser.close()

    }, 350000)
})