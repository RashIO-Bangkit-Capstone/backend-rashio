const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ArticleBody extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  ArticleBody.init({
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Articles',
        key: 'id',
      },
    },
    body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ArticleBody',
    timestamps: false,
  });
  return ArticleBody;
};