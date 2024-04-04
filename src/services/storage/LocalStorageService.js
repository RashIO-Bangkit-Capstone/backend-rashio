const fs = require('fs');
const ServerError = require('../../exceptions/ServerError');

class LocalStorageService {
  constructor() {
    this.uploadBaseUrl = process.env.UPLOAD_BASE_URL;

    if (!this.uploadBaseUrl) {
      throw new ServerError('UPLOAD_BASE_URL is not defined');
    }
  }

  generateUploadURL(fileName) {
    return `${this.uploadBaseUrl}/${fileName}`;
  }

  async uploadImagePrediction(image) {
    const fileType = image.hapi.headers['content-type'].split('/')[1];
    const folderName = 'predictions';
    const fileName = `${folderName}/${Date.now()}.${fileType}`;

    // eslint-disable-next-line no-underscore-dangle
    fs.writeFileSync(`${process.cwd()}/uploads/${fileName}`, image._data, 'binary')

    return this.generateUploadURL(fileName);
  }

  async uploadImageArticle(image) {
    const fileType = image.hapi.headers['content-type'].split('/')[1];
    const folderName = 'articles';
    const fileName = `${folderName}/${Date.now()}.${fileType}`;

    // eslint-disable-next-line no-underscore-dangle
    fs.writeFileSync(`${process.cwd()}/uploads/${fileName}`, image._data, 'binary')

    return this.generateUploadURL(fileName);
  }
}

module.exports = LocalStorageService;
