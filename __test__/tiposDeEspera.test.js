const puppeteer = require('puppeteer')

describe('tipos de espera', () => {

    it('Mostrar todos los tipos de espera', async () => {
        
        const browser = await puppeteer.launch({
            headless: false,
            //slowMo: 1000,
            //devtools: false,
            defaultViewport: null
        })
        
        const page = await browser.newPage()

        //esta espera nos sirve para esperar hasta q la pagina carge
        //en su totalidad
        await page.goto('https://platzi.com', {waitUntil: 'networkidle0'})

        //Espera explicita
        //El metodo waitForTimeout ha sido marcado como
        //obsoleto a partir de la version 16.1.1.
        //En su lugar se recomienda ejecutar un setTimeout

        //await page.waitForTimeout(3000)

        //Espera por un css selector
        //await page.waitForSelector('img')

        //Esperar por un xpath
        await page.waitForXPath('//*[@id="home-public-old"]/header/nav/div[1]/div/a/div/figure[2]/img')
        
        await page.goto('https://demoqa.com/modal-dialogs', {waitUntil: 'networkidle2'})

        //aca estamos haciendo q espere no solo hasta q carge el 
        //elemento sino q tambien hasta q se haga visible
        await page.waitForSelector('#showSmallModal', {visible: true})
        await page.click('#showSmallModal')

        // Espera por funcion

        await page.waitForFunction(() => document.querySelector('#example-modal-sizes-title-sm').innerText === 'Small Modal')

        // Ejemplo para observar el viewport

        // const observaResize = page.waitForFunction('window.innerWidth < 100')
        // await page.setViewport({width: 50, height: 50})

        // await observaResize

        //aca estamos validando que la alerta o el mensaje se cerro
        await page.click('#closeSmallModal')
        await page.waitForFunction(() => !document.querySelector('#example-modal-sizes-title-sm'))


        await browser.close()
    }, 350000)
})