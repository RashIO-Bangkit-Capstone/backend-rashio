const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DiseaseTreatment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  DiseaseTreatment.init(
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
      treatment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'DiseaseTreatment',
      timestamps: false,
    }
  );
  return DiseaseTreatment;
};
