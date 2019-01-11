const puppeteer = require('puppeteer')
const path = require('path')

module.exports = async (url, flags, options) => {
  puppeteer.launch({
    /* page.pdf() 는 headless: true 에서만 동작한다. */
    headless: true,
    defaultViewport: {
      width: 1280,
      height: 800
    },
    args: ['--lang=ko-KR,ko']
  }).then(async browser => {
    const page = (await browser.pages())[0]

    await page.goto(url)

    const bodyHandle = await page.$('body');
    await page.evaluate(body => {
      const el = body.querySelector('div#readme')
      el.firstElementChild.style.cssText = 'border: 0px'

      const html = el.outerHTML
      body.innerHTML = html
    }, bodyHandle)

    /**
     * TODO:
     * - work with remote url
     */
    if (flags.css) {
      await page.addStyleTag({
        path: path.resolve(__dirname, flags.css)
      })
    }

    await page.emulateMedia('screen')

    try {
      /**
       * TODO:
       * - interactive mode to configure
       *  https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
       */
      await page.pdf(options)
    } catch (err) {
      console.log(err)
    }

    browser.close()
  })
}
