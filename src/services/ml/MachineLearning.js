/* eslint-disable max-classes-per-file */
const tf = require('@tensorflow/tfjs-node');
const { loadImage, createCanvas } = require('canvas');

// additional layers
class FixedDropout extends tf.layers.Layer {
  static className = 'FixedDropout';

  // eslint-disable-next-line no-useless-constructor
  constructor(config) {
    super(config);
  }
}

class L1 {
  static className = 'L1';

  constructor(config) {
    // eslint-disable-next-line no-constructor-return
    return tf.regularizers.l1l2(config);
  }
}

class MachineLearning {
  constructor() {
    this.model = null;
    this.LABELS = ['Dermatitis', 'Eczema/Eksim', 'Psoriasis'];
  }

  /**
   * Load the model
   * @returns {Promise<void>}
   */
  async loadModel() {
    tf.serialization.registerClass(FixedDropout);
    tf.serialization.registerClass(L1);

    this.model = await tf.loadLayersModel('file://model_ml/model.json');
  }

  /**
   * Predict the image
   * @param {Buffer} image
   * @returns {Promise<{result: string, percentage: number}>}
   */
  async predict(image) {
    const imageData = await loadImage(image);
    const canvas = createCanvas(imageData.width, imageData.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageData, 0, 0, imageData.width, imageData.height);

    const inputTensor = tf.browser
      .fromPixels(canvas)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(tf.scalar(255))
      .expandDims();

    const result = this.model.predict(inputTensor).dataSync();
    const percentage = Math.max(...result);
    const index = result.indexOf(percentage);

    tf.dispose([inputTensor, result]);

    if (percentage < 0.6) {
      throw new Error('Disease not detected, please check the uploaded image');
    }

    return {
      result: this.LABELS[index],
      percentage,
    };
  }
}

module.exports = MachineLearning;
