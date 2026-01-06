const Sequelize = reuqire('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
require('dotenv').config();

const {
    MARIADB_HOST: host,
    MARIADB_USERNAME: username,
    MARIADB_PASSWORD: password,
    MARIADB_PORT: port,
    MARIADB_DATABASE: dbMaria
} = process.env;

const db = {};

const dbInstance = new Sequelize(`mariadb://${username}:${password}@${host}:${port}/${dbMaria}`);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(dbInstance, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;