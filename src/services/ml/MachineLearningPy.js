const { default: axios } = require("axios");
const InvariantError = require('../../exceptions/InvariantError');


/* eslint-disable max-classes-per-file */
class MachineLearningPy {
  constructor() {
    this.predictService = process.env.PREDICT_SERVICE_URL;
  }

  /**
   * Predict the image
   * @param {Buffer} image
   * @returns {Promise<{result: string, percentage: number}>}
   */
  async predict(image) {
    const formData = new FormData();


    const blob = new Blob([image], { type: 'image/png' });

    formData.append('file', blob);

    const result = await axios.post(this.predictService, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const { percentage } = result.data;

    if (percentage < 0.6) {
      throw new InvariantError(
        'Disease not detected, please check the uploaded image'
      );
    }

    return result.data;
  }
}

module.exports = MachineLearningPy;
