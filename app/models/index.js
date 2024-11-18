const Sequelize = require("sequelize");
const sequelize = new Sequelize('katteapp', 'root', '', {
  host: "localhost",
  dialect: "mysql",
  port: 3306
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.catTexts = require("./catText.model.js")(sequelize, Sequelize);

module.exports = db;

//test 