const puppeteer = require('puppeteer')

//Aca estamos implementando nuestra libreria
const {getText, getCount} = require('../lib/helpers')

describe('Extrayendo info', () => {

    let browser
    let page

    beforeAll(async() => {

        browser = await puppeteer.launch({
            headless: false,
            product: 'firefox',
            //slowMo: 1000,
            //devtools: false,
            defaultViewport: null
        })

        page = await browser.newPage()
        await page.goto('https://platzi.com', {waitUntil: 'networkidle0'})
        
        
    }, 10000)

    afterAll(async() => {

        await browser.close()

    })

    it('Extraer el titulo de la pagina', async () => {

        //aca obtenemos la url y el titulo para validarlos
        const titulo = await page.title()
        const url = await page.url()

        console.log('titulo', titulo)
        console.log('url', url)      

        
    }, 350000)

    it('Extraer info de un elemento', async () => {
        
        await page.waitForSelector('#home-public-old > header > nav > div.Actionsv2 > a')

        //con esto estraemos la informacion de un boton el texto que se ve sobre el boton
        //const nombreBoton = await page.$eval('#home-public-old > header > nav > div.Actionsv2 > a',(button)=> button.textContent)
        
        const nombreBoton = await getText(page, '#home-public-old > header > nav > div.Actionsv2 > a')
        
        
        console.log('nombreBoton', nombreBoton)

        
    }, 350000) 

    
    it('Contar los elementos de una pagina', async () => {
        
        //esto nos sirve para contar cuantas imagenes hay en la pagina
        //const images = await page.$$eval('img', (imagenes) => imagenes.length)
        const images = await getCount(page, 'img')
        console.log('images', images)

        
    }, 350000)
    
})