#!/usr/bin/env node

const keypress = require('keypress')
const meow = require('meow')

const cmd  = require('../index.js')

const cli = meow(`
  Usage
    $ gitpdf <input>
    $ gitpdf <input> --open

  Options
    --url       markdown url at github.com
    --open      Open pdf

  Examples
    $ gitpdf https://github.com/rhiokim/personal-goals/blob/master/CV.md --open
`, {
  flags: {
    url: {
      type: 'string'
    },
    open: {
      type: 'boolean'
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
/**
 * prompts 모듈이 동작할 때 Ctrl + C 가 정상 동작오류 개선
 */
process.stdin.on('keypress', (ch, key) => {
  if (key && key.ctrl && key.name === 'c') {
    process.stdout.write('\n사용자 강제 종료\n')
    process.exit(0);
  }
})

const url = cli.input[0]

if (url) {
  cmd(url, cli.flags)
} else {
  throw new Error('$ gitpdf https://github.com/facebook/react/blob/master/README.md')
}