//her sørger vi for at registrere den nye CatText-model i vores databasekonfiguration

//Importerer Sequelize-biblioteket, der bruges som ORM til at snakke sammen med databasen
const Sequelize = require("sequelize");



// Initialiser en Sequelize-instans med databaseforbindelse
//const sequelize = new Sequelize(
  //process.env.DB_DATABASE,
  //process.env.DB_USERNAME,
  //process.env.DB_PASSWORD,
  //{
  //host: process.env.DB_HOST, // Databaseværten, typisk localhost under udvikling
  //dialect: "mysql", // Angiver hvilken database der bruges (MySQL)
  //port: process.env.DB_PORT || 3306 
  // Initialiser en Sequelize-instans med databaseforbindelse
const sequelize = new Sequelize('katteapp', 'root', '', {
  host: "localhost", // Databaseværten, typisk localhost under udvikling
  dialect: "mysql", // Angiver hvilken database der bruges (MySQL)
  port: 3306 // Angiver hvilken port databasen lytter på
});

// Opretter et tomt objekt til at holde alle database-relaterede ressourcer som modeller og forbindelsesinstansen
const db = {};

// Gemmer Sequelize-instansen i db-objektet, så den kan bruges til at oprette forbindelse til databasen eller udføre forespørgsler
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importerer cattext.model.js-filen, som definerer CatText-modellen
//Initialiserer modellen med sequelize (forbindelsen) og Sequelize (ORM-funktioner)
//Gemmer modellen i db.cattexts, så den kan bruges i resten af applikationen
db.cattexts = require("./catText.model.js")(sequelize, Sequelize);
db.shopitems = require("./shopitem.model.js")(sequelize, Sequelize);

// Eksporterer db-objektet, så det kan bruges af andre moduler, fx i routes eller controllers
module.exports = db;