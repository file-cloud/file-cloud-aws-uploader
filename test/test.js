'use strict';
//var assert = require('assert');
var fileCloudAwsUploader = require('../');
var path = require('path');
var assert = require('assert');
var validator = require('validator');

describe('file-cloud-aws-uploader node module', function () {
  it('must have at least one test', function (done) {
    var called = false;
    var config = {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET,
      endpoint: process.env.AWS_S3_ENDPOINT,
      Bucket: process.env.AWS_S3_BUCKET,
      region: process.env.AWS_S3_REGION,
      progress: function (/*evt*/) {
        called = true;
      }
    };
    fileCloudAwsUploader(function (error, hashNamedFile, data) {
      assert.equal(true, !error);
      assert.equal(true, typeof hashNamedFile === 'string');
      assert.equal(true, validator.isHexadecimal(data.ETag.replace(/\"/g, "")));
      assert.equal(true, validator.isURL(data.Location));
      assert.equal(true, called);
      done();
    }, path.resolve(__dirname, 'assets/a.jpg'), config);
  });
});
