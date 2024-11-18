const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

/*var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));*/
const db = require("./app/models");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


db.sequelize.sync() //sync() metoden opretter tabellerne i databasen, hvis de ikke allerede eksisterer
  .then(() => { //hvis sync() metoden lykkedes
    console.log('synced');
  })
  .catch((err) => { //hvis sync() metoden fejlede
    console.log("Kunne ikke synkronisere med databasen: " + err.message);
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Velkommen til katte-app API" });
});

//inklere vores router /med eller uden .js?/
require("./app/routes/catText.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});