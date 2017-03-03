#! /usr/bin/env node

'use strict';

var _ = require('lodash');
var BluePromise = require('bluebird');
var chalk = require('chalk');
var debug = require('debug');
var fs = require('fs');
var Handlebars = require('handlebars');
var path = require('path');
var program = require('commander');
var util = require('util');

var dlog = debug('interpolate');

program
  .option('-f, --file [path]', 'Handlebars helper')
  .option('-j, --json [path]', 'JSON file with input data')
  .option('-t, --template [path]', 'Handlebars template to interpolate')
  .option('-n, --noEscape', 'Don\'t do HTML escaping')
  .on('--help', function() {
    console.log(
      'If the JSON file is a package.json, read-package-json is used to read the file.'
    );

    console.log('Note that read-package-json normalizes some fields.');
    console.log(chalk.bold(
      '  `--json [path]` and `--template [path]` are REQUIRED.'));
  })
  .parse(process.argv);

var opts = program.opts();

if (_.isUndefined(opts.json) || _.isUndefined(opts.template)) {
  program.help();
}

var readTextP = BluePromise.promisify(fs.readFile, fs);

function writeP(text) {
  return new BluePromise(function(resolve, reject) {
    process.stdout.write(text, 'utf8', function(err) {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}

function readPackageJsonP(jsonPath) {
  var readJson = require('read-package-json');
  return new BluePromise(function(resolve, reject) {
    readJson(jsonPath, console.error, false, function(err, data) {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}

var readJsonP = null;
if (path.basename(opts.json) === 'package.json') {
  readJsonP = readPackageJsonP;
} else {
  var jsonfile = require('jsonfile');
  readJsonP = BluePromise.promisify(jsonfile.readFile, jsonfile);
}

function makeModulePath(module) {
  return path.resolve(module); // Get absolute path.
}

var helpers = null;
if (!_.isUndefined(opts.file)) {
  helpers = require(makeModulePath(opts.file));
}

BluePromise
  .join(
    readJsonP(opts.json),
    readTextP(opts.template, {
      encoding: 'utf8'
    }),
    function(json, templateText) {
      if (!_.isNull(helpers)) {
        helpers.registerHelpers(Handlebars);
      }

      var template = Handlebars.compile(templateText, {
        noEscape: program.opts().noEscape
      });
      var result = template(json);
      return result;
    })
  .then(function(text) {
    return writeP(text);
  })
  .done();
