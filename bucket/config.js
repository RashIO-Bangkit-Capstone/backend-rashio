require('dotenv').config();

module.exports = {
  keyFilename: `${__dirname}/../${process.env.KEY_FILE_NAME}`,
  bucketName: process.env.BUCKET_NAME,
};
