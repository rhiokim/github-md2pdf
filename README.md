# GitPDF

If you enjoy markdown on Github.com, sometime you want to generate PDF from Github markdown

## How to use

```bash
$ npm install -g gitpdf
```

```bash
$ gitpdf --help

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
```

## TODO

- [ ] Support various options to print PDF such as margin, padding, paper size and etc

## License

MIT