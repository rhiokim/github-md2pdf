#!/usr/bin/env node

const keypress = require('keypress')
const meow = require('meow')
const inquirer = require('inquirer')
const chalk = require('chalk')
const isBlank = require('is-blank')
const path = require('path')

const cmd  = require('../index.js')
const questions = require('./questions.js')

const cli = meow(`
  Usage
    $ gitpdf <input>
    $ gitpdf <input> --open

  Options
    --url                 Markdown url at github.com
    --css                 Add style tag
    --open                Open pdf
    -o, --ouput           Output path
    -i, --interactive     Interactive mode

  Examples
    $ gitpdf https://github.com/rhiokim/gitpdf/blob/master/README.md --open
    $ gitpdf https://github.com/jquery/jquery/blob/master/README.md --css=./default.css
`, {
  flags: {
    interactive: {
      type: 'boolean',
      alias: 'i'
    },
    output: {
      type: 'string',
      alias: 'o'
    },
    url: {
      type: 'string'
    },
    open: {
      type: 'boolean'
    },
    css: {
      type: 'string'
    }
  }
})
/*
{
    input: ['unicorns'],
    flags: {rainbow: true},
    ...
}
*/

const cwd = process.cwd()
/**
 * prompts 모듈이 동작할 때 Ctrl + C 가 정상 동작오류 개선
 */
process.stdin.on('keypress', (ch, key) => {
  if (key && key.ctrl && key.name === 'c') {
    process.exit(0);
  }
})

if (cli.flags.interactive) {
  inquirer
    .prompt(questions)
    .then(answers => {
      const url = answers.url
      const margin = answers.margin.split(' ')
      let output = answers.output && path.resolve(__dirname, answers.output)

      cmd(url, cli.flags, Object.assign({}, answers, {
          margin: {
            top: margin[0] || 30,
            right: margin[1] || 30,
            bottom: margin[2] || 30,
            left: margin[3] || 30
          },
          path: output || `${cwd}/${path.basename(url)}.pdf`
        })
      )
    })
} else {
  const url = cli.input[0]

  if (isBlank(url)) {
    console.log(cli.help)
    process.exit(1)
  } else {
    let output = cli.flags.output && path.resolve(__dirname, cli.flags.output)

    cmd(url, cli.flags, {
      margin: {
        top: 30,
        right: 0,
        bottom: 30,
        left: 0
      },
      path: output
    }).then(response => {

      if (cli.flags.open) {
        opn(output)
      }

      // spinner.succeed()
      // process.exit(0)
    }).catch(err => {
      throw err
    })

  }
}

