const puppeteer = require('puppeteer')
const path = require('path')

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

  await page.goto(`https://github.com/rhiokim/personal-goals/blob/master/CV.md`)

  // const html = await page.$eval('div#readme', e => e.outerHTML);

  // console.log(html)
  const bodyHandle = await page.$('body');
  await page.evaluate(body => {
    const el = body.querySelector('div#readme')
    el.firstElementChild.style.cssText = 'border: 0px'

    const html = el.outerHTML
    body.innerHTML = html
  }, bodyHandle)

  // await page.setContent(html)

  await page.emulateMedia('screen')

  try {
    await page.pdf({
      margin: {
        top: 30,
        bottom: 30
      },
      path: path.join(__dirname, 'page.pdf')
    })
  } catch (err) {
    console.log(err)
  }

  browser.close()
})
