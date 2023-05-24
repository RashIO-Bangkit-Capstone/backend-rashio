const { Storage } = require('@google-cloud/storage');
const { keyFilename, bucketName } = require('./config');

const storage = new Storage({
  keyFilename,
});

const bucket = storage.bucket(bucketName);

module.exports = bucket;
