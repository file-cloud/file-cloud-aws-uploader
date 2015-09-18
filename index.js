'use strict';
var fs = require('fs');
var zlib = require('zlib');
var path = require('path');
var fash = require('file-hash');

module.exports = function (next, filename, awsConf, type, upper) {
  if (!fs.existsSync(filename)) {
    throw Error(filename + " not exists");
  }
  fash(function (hash) {
      var hashNamedFile = hash + path.extname(filename);
      var body = fs.createReadStream(filename).pipe(zlib.createGzip());
      var AWS = require('aws-sdk');
      var endpoint = new AWS.Endpoint(awsConf.endpoint);
      var config = {
        accessKeyId: awsConf.accessKeyId,
        secretAccessKey: awsConf.secretAccessKey,
        endpoint: endpoint
      };

      if (awsConf.region) {
        config.region = awsConf.region;
      }

      AWS.config.update(config);
      var s3 = new AWS.S3({
        params: {
          Bucket: awsConf.Bucket,
          Key: hashNamedFile
        },
        signatureVersion: 'v4'
      });
      s3.upload({
        Body: body
      })
        .on('httpUploadProgress', awsConf.progress || function () {})
        .send(next);
    },
    filename,
    type,
    upper
  );

};
