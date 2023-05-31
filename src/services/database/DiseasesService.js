const InvariantError = require('../../exceptions/InvariantError');
const ServerError = require('../../exceptions/ServerError');

const {
  Disease,
  sequelize,
  DiseaseDescription,
  DiseaseTreatment,
} = require('../../../db/models');

class DiseasesService {
  constructor() {
    this.Disease = Disease;
  }

  async checkDiseaseNameAvailable(name) {
    const disease = await this.Disease.findOne({ where: { name } });

    if (disease) {
      throw new InvariantError('disease name already used');
    }
  }

  async addDisease(payload) {
    const { name, descriptions, treatments } = payload;
    // db transaction
    const t = await sequelize.transaction();

    try {
      const disease = await this.Disease.create({ name }, { transaction: t });

      const diseaseId = disease.id;

      const diseaseDescriptions = descriptions.map((description) => ({
        diseaseId,
        description,
      }));

      const diseaseTreatments = treatments.map((treatment) => ({
        diseaseId,
        treatment,
      }));

      await DiseaseDescription.bulkCreate(diseaseDescriptions, {
        transaction: t,
      });

      await DiseaseTreatment.bulkCreate(diseaseTreatments, {
        transaction: t,
      });

      await t.commit();

      return disease;
    } catch (error) {
      await t.rollback();
      throw new ServerError('internal server error');
    }
  }
}

module.exports = DiseasesService;
