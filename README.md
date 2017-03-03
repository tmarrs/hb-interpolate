# hb-interpolate-helpers
*Interpolate a json file through a [Handlebars](http://handlebarsjs.com/) template file to stdout.*

### About

`hb-interpolate-helpers` (based on [`hb-interpolate`](https://github.com/jimlloyd/hb-interpolate.git)) is a very simple command line tool that reads a `.json` file and a Handlebars template file, and then writes the implied interpolation to stdout. This project was forked from 
[`hb-interpolate`](https://github.com/jimlloyd/hb-interpolate.git), and adds the ability to pass in an optional
Handlebars helper file.

### Usage

```
$ hb-interpolate-helpers --help

  Usage: hb-interpolate-helpers [options]

  Options:

    -f, --file             Handlebars helper file
    -h, --help             Output usage information
    -j, --json [path]      JSON file with input data
    -t, --template [path]  Handlebars template to interpolate
    -n, --noEscape         Don't do HTML escaping

If the JSON file is a package.json, read-package-json is used to read the file.
Note that read-package-json normalizes some fields.
  `--json [path]` and `--tempate [path]` are REQUIRED.
```

### Notes

* The `--json [path]` and `--template [path]` arguments are required.
* If the basename of the json path is `package.json`, hb-interpolate-helpers uses the node package [read-package-json](https://www.npmjs.com/package/read-package-json) to read the file, which normalizes some fields, in particular all [people fields](https://docs.npmjs.com/files/package.json#people-fields-author-contributors). Any other JSON file is returned directly as read.
* The `--noEscape` option may be used to turn off Handlebars HTML escaping.
* The `--file` option may be used to add in a Handlebars.

