module.exports={

    click: async function(page,selector,opts = {}) {
        try {
            //para esperar por los elementos con los cuales vamos
            //a interactuar
            await page.waitForSelector (selector)
            await page.click (selector, opts)

        } catch (e) {

            throw new Error(`Error al dar click: ${selector}`)

        }


    },

    doubleClick: async function(page, selector) {
        try {

            await page.waitForSelector (selector)
            await page.click (selector, {clickCount: 2})

        } catch (e) {

            throw new Error(`Error al dar doubleclick: ${selector}`)

        }


    },

    getText: async function(page, selector) {
        try {

            await page.waitForSelector (selector)
            return await page.$eval(selector, (elemento) => elemento.textContent)

        } catch (e) {

            throw new Error(`Error al obtener el texto: ${selector}`)

        }


    },

    type: async function(page, selector, text, opts = {}) {
        try {

            await page.waitForSelector (selector)
            await page.type(selector, text, opts)

        } catch (e) {

            throw new Error(`Error al escribir: ${selector}`)

        }


    },

    getCount: async function(page, selector) {
        try {

            await page.waitForSelector (selector)
            return await page.$$eval(selector, (elemento) => elemento.length)

        } catch (e) {

            throw new Error(`Error al escribir: ${selector}`)

        }


    }

}