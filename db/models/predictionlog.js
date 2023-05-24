const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PredictionLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  PredictionLog.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      imageUrl: DataTypes.STRING,
      result: DataTypes.STRING,
      percentage: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'PredictionLog',
    }
  );
  return PredictionLog;
};
