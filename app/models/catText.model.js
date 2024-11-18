//catText er en model der repræsenterer kattebillederne og den tilhørende tekst

const { all } = require("sequelize/types/lib/operators");

module.exports = (sequelize, Sequelize) => {
    const CatText = sequelize.define("cattext", {
      id: {
        type: Sequelize.INTEGER, //for bedre at understøtte auto-increment funktionaliteten
        autoIncrement: true,
        primaryKey: true
      },
      image_id: { //et id til at identificere hvilken kattekategori teksten hører til
        type: Sequelize.STRING,
        allowNull: false, //sørger for at der altid er en værdi
        unique: true //sørger for at der ikke er to tekster med samme værdi
      },
      text: { //teskten der skal vises i appen til brugeren
        type: Sequelize.STRING, //ændre til string for at gemme mere komplekse data end 'boolean' som er primært til simple sandt/falsk værdier
        allowNull: false //sørger for at der altid er en værdi
      }
    });
  
    return CatText;
  };