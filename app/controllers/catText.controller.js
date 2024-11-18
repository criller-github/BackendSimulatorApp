const { text } = require("body-parser");
const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new cat text
exports.create = (req, res) => {
  // Validate request
  if (!req.body.image_id || !req.body.text) {
    res.status(400).send({
      message: "indholdet kan ikke være tomt!" 
    });
    return;
  }

  // Create a cat text
  const catText = {
    image_id: req.body.image_id,
    text: req.body.text,
  };

  // Save cat text in the database
  CatText.create(catText)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "der opstod en fejl ved oprettelse af teksten"
      });
    });
};

// Retrieve all cattext from the database.
exports.findAll = (req, res) => {
    const image_id = req.query.image_id;
    var condition = image_id ? { image_id: { [Op.like]: `%${image_id}%` } } : null;
  
    CatText.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "der opstod en fejl ved hentning af teksterne"
        });
      });
  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

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
      .catch(err => {
        res.status(500).send({
          message: "Fejl ved hentning af CatText med id=" + id
        });
      });
  
};

// Update a cattext by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    CatText.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "CatText blev opdateret succesfuldt"
          });
        } else {
          res.send({
            message: `Kan ikke opdatere CatText med id=${id}. Måske blev CatText ikke fundet eller req.body er tom`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Fejl ved opdatering af CatText med id=" + id
        });
      });
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

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
      .catch(err => {
        res.status(500).send({
          message: "Kunne ikke slette CatText med id=" + id
        });
      });
  
};

// Delete all Tutorials from the database. /skal måske slette/
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
              err.message || "Der opstod en fejl under sletning af alle CatTexts"
          });
        });
    
};