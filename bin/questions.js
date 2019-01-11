const inquirer = require('inquirer')
const chalk = require('chalk')

module.exports = [
  {
    type: 'input',
    name: 'url',
    message: `Input url on Github.com ${chalk.magenta('answer')} ?`
  },
  {
    type: 'input',
    name: 'output',
    message: `Input output path ${chalk.magenta('answer')} ?`
  },
  {
    type: 'input',
    name: 'margin',
    message: `Input margin top, right, bottom, left ${chalk.grey('e.g.) 30 20 30 20')} ?`
  },
  {
    type: 'rawlist',
    name: 'format',
    message: 'Choose paper format',
    // https://github.com/GoogleChrome/puppeteer/blob/29a24385347b63ba29694be3fb8251bc08b00bf9/lib/Page.js#L1130
    choices: [
      'Letter',
      'A4',
      'A3'
    ]
  }
]