//dette er rygraden i backend-applikationen. 
//Den initialiserer Express-serveren, sætter middleware, håndterer routing, og konfigurerer databaseforbindelsen.

//Importerer Express-biblioteket, der bruges til at oprette serveren og definere ruter
const express = require("express");

//Importerer CORS (Cross-Origin Resource Sharing), som gør det muligt for klienten (frontend) at kommunikere med serveren (backend) på tværs af forskellige domæner
const cors = require("cors");

//opretter en Express-applikation
const app = express();

//Aktiverer CORS, så serveren tillader anmodninger fra frontend'en, selv hvis de kører på forskellige domæner eller porte
app.use(cors());

// Middleware, der gør det muligt for serveren at parse JSON-data i HTTP-forespørgsler
app.use(express.json());

// Middleware, der gør det muligt for serveren at parse URL-kodede data (for eksempel fra HTML-formularer)
app.use(express.urlencoded({ extended: true }));

//Importerer databasekonfigurationen fra index.js i models-mappen. Denne konfiguration indeholder Sequelize-objektet og databasen
const db = require("./app/models");

// Synkroniserer databasen, hvilket betyder, at Sequelize sørger for, at tabellerne i databasen matcher de definerede modeller
//dette sikre, at tabellerne og deres strukturer er oprettet korrekt, før applikationen starter
db.sequelize.sync();

// En simpel route der definerer en GET-endpoint ved rod-URL'en (http://localhost:8080/)
app.get("/", (req, res) => {
  //Denne endpoint returnerer en JSON-velkomstbesked, som kan bruges til at teste, om serveren kører korrekt
  res.json({ message: "Velkommen til katte-app API." });
});

// Importerer og registrerer ruterne fra catText.routes.js og gør dem tilgængelige via serveren
//For eksempel vil en anmodning til http://localhost:8080/api/cattexts blive håndteret af denne fil
require("./app/routes/catText.routes.js")(app);

// Angiver porten, som serveren skal lytte på
//process.env.PORT: Bruges, hvis serveren kører i en cloud-environment, hvor porten kan være dynamisk
//8080: Bruges, hvis serveren kører lokalt og ingen port er angivet
const PORT = process.env.PORT || 8080;

// Starter serveren og lytter efter anmodninger på den angivne port
app.listen(PORT, () => {
  //Callback-funktionen logger en besked i konsollen, så du ved, at serveren kører
  console.log(`Serveren kører på port ${PORT}.`);
});