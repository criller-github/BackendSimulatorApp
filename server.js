const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// Parse requests af content-type - application/json
app.use(express.json());

// Parse requests af content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

// Synkroniser databasen
db.sequelize.sync();

// En simpel route
app.get("/", (req, res) => {
  res.json({ message: "Velkommen til katte-app API." });
});

// Inkluder ruterne
require("./app/routes/catText.routes.js")(app);

// Sæt porten og lyt til anmodninger
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serveren kører på port ${PORT}.`);
});