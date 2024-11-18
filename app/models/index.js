//her sørger vi for at registrere den nye CatText-model i vores databasekonfiguration

const Sequelize = require("sequelize");
const sequelize = new Sequelize('katteapp', 'root', '', {
  host: "localhost",
  dialect: "mysql",
  port: 3306
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cattexts = require("./cattext.model.js")(sequelize, Sequelize);

module.exports = db;

//test 