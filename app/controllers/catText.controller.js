//den her kode fungerer som controller for backend-applikationen og håndterer alle CRUD-operationer (Create, Read, Update, Delete) for CatText-modellen. 
//Controlleren er ansvarlig for at modtage HTTP-forespørgsler fra ruterne, udføre de ønskede databaseoperationer og returnere svar til klienten


//Importerer alle databasekonfigurationer og modeller fra models/index.js
const db = require('../models');
//Gør det muligt at bruge CatText-modellen til databaseoperationer
const CatText = db.cattexts;
//Importerer Sequelize-operatorer, som bruges til at bygge dynamiske forespørgsler, f.eks. LIKE, AND, OR
const Op = db.Sequelize.Op;

// Opret og gem en ny CatText
// Opretter en ny post i databasen baseret på image_id og text fra klienten
exports.create = (req, res) => {
  // Valider anmodningen
  //Tjekker, om begge felter (image_id og text) er til stede i anmodningen
  if (!req.body.image_id || !req.body.text) {
    res.status(400).send({
      message: "Indhold kan ikke være tomt!",
    });
    return;
  }

  // Opret en CatText
  const catText = {
    image_id: req.body.image_id,
    text: req.body.text,
  };

  // Gem i databasen
  // Bruger CatText.create() til at indsætte data i databasen
  CatText.create(catText)
    .then((data) => {
      res.send(data);
    })
    //Returnerer en fejl, hvis databasen ikke kan gemme data
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Der opstod en fejl under oprettelsen af CatText.",
      });
    });
};

// Henter alle CatTexts fra databasen
exports.findAll = (req, res) => {
  const image_id = req.query.image_id;
  //Hvis image_id sendes som forespørgsel, filtrerer den resultaterne
  //Brug af [Op.like] gør det muligt at søge efter delvise matches
  var condition = image_id ? { image_id: { [Op.like]: `%${image_id}%` } } : null;

  //Bruger CatText.findAll() til at hente data fra databasen
  CatText.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    //Returnerer en fejl, hvis der opstår en fejl under hentning af data
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Der opstod en fejl under hentning af CatTexts.",
      });
    });
};

// finder en enkelt CatText med et id
//Henter en enkelt post baseret på dens primære nøgle (id)
exports.findOne = (req, res) => {
    const id = req.params.id;
    //Bruger findByPk() (Find by Primary Key) til at finde posten med det angivne id
    CatText.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Kan ikke finde CatText med id=${id}.`
          });
        }
      })
      //Returnerer en fejl, hvis der opstår en fejl under hentning af data
      .catch(err => {
        res.status(500).send({
          message: "Fejl ved hentning af CatText med id=" + id
        });
      });
  
};

// Opdaterer en eksisterende post i databasen baseret på ID
exports.update = (req, res) => {
  const id = req.params.id;

  //Bruger CatText.update() til at opdatere data.
  CatText.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "CatText blev opdateret succesfuldt.",
        });
      } else {
        res.send({
          message: `Kan ikke opdatere CatText med id=${id}. Måske blev CatText ikke fundet eller req.body er tom!`,
        });
      }
    })
    //Returnerer en fejl, hvis der opstår en fejl under opdatering af data
    .catch((err) => {
      res.status(500).send({
        message: "Fejl ved opdatering af CatText med id=" + id,
      });
    });
};

// Sletter en enkelt post baseret på dens ID.
exports.delete = (req, res) => {
    const id = req.params.id;

    //Bruger CatText.destroy() til at fjerne data fra databasen
    CatText.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "CatText blev slettet succesfuldt"
          });
        } else {
          res.send({
            message: `Kan ikke slette CatText med id=${id}. Måske blev CatText ikke fundet!`
          });
        }
      })
      //Returnerer en fejl, hvis ID’et ikke findes i databasen
      .catch(err => {
        res.status(500).send({
          message: "Kunne ikke slette CatText med id=" + id
        });
      });
  
};

// gør det samme som delete men vi bruger den ikke
exports.deleteAll = (req, res) => {
  CatText.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} CatTexts blev slettet succesfuldt!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Der opstod en fejl under sletning af alle CatTexts",
          });
        });
    
};