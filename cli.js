#!/usr/bin/env node
'use strict';
var meow = require('meow');
var fileCloudAwsUploader = require('./');
var path = require('path');
var fs = require('fs');

var cli = meow({
  help: [
    'Usage',
    '  faws3 filename config [--type sha1] [--case upper]',
    '',
    'Example',
    '  faws3 a.jpg aws.conf'
  ].join('\n')
});

var conf = JSON.parse(String(fs.readFileSync(path.resolve(process.env.PWD, cli.input[1]))));

if (cli.input[0] && cli.input[1]) {
  fileCloudAwsUploader(function (error, hashNamedFile, data) {
      if (error) {
        console.log('Errors Occur:' + error);
      } else {
        console.log('Hashed Filename: ' + hashNamedFile);
        console.log('ETag: ' + data.ETag);
        console.log('Location: ' + data.Location);
      }
    },
    path.resolve(process.env.PWD, cli.input[0]),
    conf,
    cli.flags.type,
    cli.flags.case === 'upper'
  );
} else {
  if (!cli.input[0]) {
    console.log("specify a file to be copied!");
    return;
  }
  if (!cli.input[1]) {
    console.log("specify a dir for the file to be copied!");
  }
}
