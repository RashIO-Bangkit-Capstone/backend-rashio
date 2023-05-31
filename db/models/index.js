const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};
const User = require('./user');
const Authentication = require('./authentication');
const Predictionlog = require('./predictionlog');
const Disease = require('./disease');
const DiseaseDescription = require('./diseasedescription');
const DiseaseTreatment = require('./diseasetreatment');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
  )
  .forEach((file) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// define models
db.User = User(sequelize, Sequelize);
db.Authentication = Authentication(sequelize, Sequelize);
db.Predictionlog = Predictionlog(sequelize, Sequelize);
db.Diseases = Disease(sequelize, Sequelize);
db.DiseaseDescription = DiseaseDescription(sequelize, Sequelize);
db.DiseaseTreatment = DiseaseTreatment(sequelize, Sequelize);

module.exports = db;
