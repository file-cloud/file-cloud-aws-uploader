#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> aws file uploader for file cloud


## Install

```sh
$ npm install --save file-cloud-aws-uploader
```


## Usage

```js
var fileCloudAwsUploader = require('file-cloud-aws-uploader');

var called = false;
var config = {
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET,
  endpoint: process.env.AWS_S3_ENDPOINT,
  Bucket: process.env.AWS_S3_BUCKET,
  progress: function (/*evt*/) {
    called = true;
  }
};
fileCloudAwsUploader(function (error, data) {
  assert.equal(true, !error);
  assert.equal(true, validator.isHexadecimal(data.ETag.replace(/\"/g, "")));
  assert.equal(true, validator.isURL(data.Location));
  assert.equal(true, called);
  done();
}, path.resolve(__dirname, 'assets/a.jpg'), config);

```

```sh

$ npm install --global file-cloud-aws-uploader

$ faws3 --help

$ faws3  a.txt aws.json

$ faws3 a.jpg aws.json --type md5

$ faws3 a.jpg aws.json --type md5 --case upper

```

## aws.json Format

### General Configure
```js
//aws.json formate
{
  "accessKeyId": "YOUR_ID",
  "secretAccessKey": "YOUR_SECRET",
  "endpoint": "s3-cn-northeast-1.amazonaws.com.cn",
  "Bucket": "subdomain.xxx.com"
}
```
### Beijing China
Must additionally add:
```js
  "endpoint": "s3.cn-north-1.amazonaws.com.cn",
  "region": "cn-north-1"
```
That is:
```js
{
  "accessKeyId": "YOUR_ID",
  "secretAccessKey": "YOUR_SECRET",
  "endpoint": "s3.cn-north-1.amazonaws.com.cn",
  "Bucket": "subdomain.xxx.com",
  "endpoint": "s3.cn-north-1.amazonaws.com.cn",
  "region": "cn-north-1"
}
```

## License

MIT © [calidion](blog.3gcnbeta.com)


[npm-image]: https://badge.fury.io/js/file-cloud-aws-uploader.svg
[npm-url]: https://npmjs.org/package/file-cloud-aws-uploader
[travis-image]: https://travis-ci.org/file-cloud/file-cloud-aws-uploader.svg?branch=master
[travis-url]: https://travis-ci.org/file-cloud/file-cloud-aws-uploader
[daviddm-image]: https://david-dm.org/file-cloud/file-cloud-aws-uploader.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/file-cloud/file-cloud-aws-uploader
