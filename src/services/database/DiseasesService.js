const InvariantError = require('../../exceptions/InvariantError');
const ServerError = require('../../exceptions/ServerError');
const NotFoundError = require('../../exceptions/NotFoundError');

const {
  Disease,
  sequelize,
  DiseaseDescription,
  DiseaseTreatment,
} = require('../../../db/models');

class DiseasesService {
  async checkDiseaseNameAvailability(name) {
    const disease = await Disease.findOne({ where: { name } });

    if (disease) {
      throw new InvariantError('Disease name already used');
    }
  }

  async addDisease(payload) {
    const { name, descriptions, treatments } = payload;
    // db transaction
    const t = await sequelize.transaction();

    try {
      const disease = await Disease.create({ name }, { transaction: t });

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
      throw new ServerError('Internal server error');
    }
  }

  async getDiseases() {
    const diseases = await Disease.findAll({
      attributes: ['id', 'name'],
    });

    return diseases;
  }

  async getDiseaseByName(name) {
    const disease = await Disease.findOne({
      where: { name },
      attributes: ['id', 'name'],
    });

    const descriptions = await DiseaseDescription.findAll({
      where: { diseaseId: disease.id },
      attributes: ['description'],
    });

    const treatments = await DiseaseTreatment.findAll({
      where: { diseaseId: disease.id },
      attributes: ['treatment'],
    });

    disease.dataValues.descriptions = descriptions.map(
      (description) => description.description
    );

    disease.dataValues.treatments = treatments.map(
      (treatment) => treatment.treatment
    );

    return disease;
  }

  async checkDiseaseAvailableByName(name) {
    const disease = await Disease.findOne({ where: { name } });

    if (!disease) {
      throw new NotFoundError('Disease not found');
    }
  }

  async updateDiseaseByName(name, payload) {
    // get disease id
    const disease = await Disease.findOne({ where: { name } });

    // open transaction
    const t = await sequelize.transaction();

    try {
      // delete all descriptions and treatments
      await DiseaseDescription.destroy({
        where: { diseaseId: disease.id },
        transaction: t,
      });

      await DiseaseTreatment.destroy({
        where: { diseaseId: disease.id },
        transaction: t,
      });

      // add new descriptions and treatments
      const { descriptions, treatments } = payload;

      const diseaseDescriptions = descriptions.map((description) => ({
        diseaseId: disease.id,
        description,
      }));

      const diseaseTreatments = treatments.map((treatment) => ({
        diseaseId: disease.id,
        treatment,
      }));

      await DiseaseDescription.bulkCreate(diseaseDescriptions, {
        transaction: t,
      });

      await DiseaseTreatment.bulkCreate(diseaseTreatments, {
        transaction: t,
      });

      // commit transaction
      await t.commit();
    } catch (error) {
      // rollback transaction
      await t.rollback();
      throw new ServerError('Internal server error');
    }
  }

  async deleteDiseaseByName(name) {
    // get disease id
    const disease = await Disease.findOne({ where: { name } });

    // open transaction
    const t = await sequelize.transaction();

    try {
      // delete all descriptions and treatments
      await DiseaseDescription.destroy({
        where: { diseaseId: disease.id },
        transaction: t,
      });

      await DiseaseTreatment.destroy({
        where: { diseaseId: disease.id },
        transaction: t,
      });

      // delete disease
      await Disease.destroy({
        where: { id: disease.id },
        transaction: t,
      });

      // commit transaction
      await t.commit();
    } catch (error) {
      // rollback transaction
      await t.rollback();
      throw new ServerError('Internal server error');
    }
  }
}

module.exports = DiseasesService;
