//catText Denne fil definerer modellen for CatText, som repræsenterer strukturen og reglerne for data i databasen 
//Modeller i Sequelize bruges til at interagere med tabeller, udføre forespørgsler og håndtere validering

//Importerer Sequelize, som er ORM'en (Object Relational Mapper) vi bruger til at interagere med databasen
const Sequelize = require('sequelize');
//Importerer Sequelize's Op (Operator) for dynamiske forespørgsler. vi bruger det ikke
const { Op } = Sequelize;

//Definerer CatText-modellen, som repræsenterer strukturen for CatText-tabellen i databasen
//Eksporterer funktionen, så modellen kan bruges i andre dele af projektet, f.eks. i index.js eller controlleren
module.exports = (sequelize, Sequelize) => {
    //Definerer tabellen cattext i databasen, baseret på strukturen inde i {}
    const CatText = sequelize.define("cattext", {
      id: { 
        type: Sequelize.INTEGER, //Feltet id er af typen INTEGER, hvilket betyder, at det kun accepterer heltal.
        autoIncrement: true, //Dette sikrer, at værdien af id automatisk øges med én for hver ny post.
        primaryKey: true //Markerer feltet som en primær nøgle, der unikt identificerer hver post i tabellen
      },
      image_id: {
        type: Sequelize.STRING, //Feltet image_id er af typen STRING, hvilket betyder, at det accepterer tekst
        allowNull: false, //Sikrer, at image_id altid skal have en værdi. Hvis feltet er tomt, vil det udløse en fejl
        unique: true //Gør værdien unik, så der ikke kan oprettes flere poster med samme image_id
      },
      text: {
        type: Sequelize.STRING, //Feltet text er også af typen STRING, da det indeholder tekst, der vises i frontend-applikationen.
        allowNull: false //Sikrer, at der altid skal være en værdi i text. Tomme felter er ikke tilladt
      }
    });
  
    return CatText;
  };