# GitPDF

## How to use

```bash
$ npm install -g gitpdf

# basic
$ gitpdf [URL]

# add custom css
$ gitpdf [URL] --css=./my.css

# output path
$ gitpdf [URL] --output=./output/result.pdf

# open preview after print to PDF
$ gitpdf [URL] --open

# e.g.
$ gitpdf https://github.com/rhiokim/gitpdf/blob/master/README.md
$ gitpdf https://github.com/jquery/jquery/blob/master/README.md --css=./my.css --output=./result.pdf --open


# interactive mode
$ gitpdf -i
$ gitpdf --interactive
```

## License

MIT