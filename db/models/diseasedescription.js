const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DiseaseDescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  DiseaseDescription.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      diseaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Diseases',
          key: 'id',
        },
      },
      description: { type: DataTypes.TEXT, notNull: true },
    },
    {
      sequelize,
      modelName: 'DiseaseDescription',
      timestamps: false,
    }
  );
  return DiseaseDescription;
};
