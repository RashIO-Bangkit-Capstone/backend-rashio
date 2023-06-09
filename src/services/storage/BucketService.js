const bucket = require('../../../bucket');
const ServerError = require('../../exceptions/ServerError');

class BucketService {
  constructor() {
    this.Bucket = bucket;
  }

  generateUploadURL(fileName) {
    return `https://storage.googleapis.com/${this.Bucket.name}/${fileName}`;
  }

  async uploadImagePrediction(image) {
    const fileType = image.hapi.headers['content-type'].split('/')[1];
    const folderName = 'predictions'
    const fileName = `${folderName}/${Date.now()}.${fileType}`;
    const file = this.Bucket.file(fileName);

    const options = {
      predefinedAcl: 'publicRead', // public access
    };

    // eslint-disable-next-line no-underscore-dangle
    await file.save(image._data, options).catch((error) => {
      throw new ServerError(error.message);
    });

    return this.generateUploadURL(fileName);
  }

  async uploadImageArticle(image) {
    const fileType = image.hapi.headers['content-type'].split('/')[1];
    const folderName = 'articles'
    const fileName = `${folderName}/${Date.now()}.${fileType}`;
    const file = this.Bucket.file(fileName);

    const options = {
      predefinedAcl: 'publicRead', // public access
    };

    // eslint-disable-next-line no-underscore-dangle
    await file.save(image._data, options).catch((error) => {
      throw new ServerError(error.message);
    });

    return this.generateUploadURL(fileName);
  }
}

module.exports = BucketService;
