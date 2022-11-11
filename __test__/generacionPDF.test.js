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

    test('PDF de pantalla completa', async () => {

        let pdfCSS = []

        pdfCSS.push('<style>')
        pdfCSS.push('h1 {font-size:10px; margin-left:30px;}')
        pdfCSS.push('</style>')

        const css = pdfCSS.join('')

        await page.pdf({

            path:'./google.pdf',
            //formato oja tamano carta
            format:'A4',

            printBackground : true,
            displayHeaderFooter : true,
            headerTemplate : css + '<h1>' + 'Mi primer PDF' + '<h1>',
            footerTemplate : css + '<h1> Page <span class = "pageNumber"></span> of <span class = "totalPages"></span> </h1>',
            margin: {

                top: '100px',
                bottom: '200px',
                right: '30px',
                left: '30px'

            }

        })

    }, 350000)

    test('PDF de pantalla completa landscape', async () => {

        let pdfCSS = []

        pdfCSS.push('<style>')
        pdfCSS.push('h1 {font-size:10px; margin-left:30px;}')
        pdfCSS.push('</style>')

        const css = pdfCSS.join('')

        await page.pdf({

            path:'./googlelandScape.pdf',
            //formato oja tamano carta
            format:'A4',

            printBackground : true,
            displayHeaderFooter : true,
            headerTemplate : css + '<h1>' + 'Mi primer PDF' + '<h1>',
            footerTemplate : css + '<h1> Page <span class = "pageNumber"></span> of <span class = "totalPages"></span> </h1>',
            margin: {

                top: '100px',
                bottom: '200px',
                right: '30px',
                left: '30px'

            },

            landscape : true

        })

    }, 350000)

})