const db = require('../models');
const ShopItem = db.shopitems;
const Op = db.Sequelize.Op;

//her oprettes en ny ShopItem i databasen
exports.create = (req, res) => {
  if (!req.body.category || !req.body.title || !req.body.price || !req.body.description) { //tjekker om alle felter er udfyldt
    return res.status(400).send({ message: "Manglende data!" }); //hvis ikke, sendes en fejlmeddelelse
  }

  const shopitem = {
    category: req.body.category,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    uses: req.body.uses || 10,
    hungerGain: req.body.hungerGain || 20,
    weightGain: req.body.weightGain || 5
  };

  ShopItem.create(shopitem)
    .then(data => res.send(data))
    .catch(err => {res.status(500).send({ message: err.message || "Fejl ved oprettelse af ShopItem" })});
};

exports.findAll = (req, res) => {
  const category = req.query.category;
  let condition = category ? { category: { [Op.eq]: category } } : null;

  ShopItem.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({ message: err.message || "Fejl ved hentning af ShopItems" });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  ShopItem.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Ingen ShopItem med id=${id}`});
    })
    .catch(err => res.status(500).send({ message: "Fejl ved hentning af ShopItem med id=" + id }));
};

exports.update = (req, res) => {
  const id = req.params.id;
  ShopItem.update(req.body, { where: { id: id }})
    .then(num => {
      if (num == 1) {
        res.send({ message: "ShopItem opdateret." });
      } else {
        res.send({ message: `Kan ikke opdatere ShopItem med id=${id}` });
      }
    })
    .catch(err => res.status(500).send({ message: "Fejl ved opdatering af ShopItem med id=" + id }));
};

exports.delete = (req, res) => {
  const id = req.params.id;
  ShopItem.destroy({ where: { id: id }})
    .then(num => {
      if (num == 1) {
        res.send({ message: "ShopItem slettet" });
      } else {
        res.send({ message: `Kan ikke slette ShopItem med id=${id}` });
      }
    })
    .catch(err => res.status(500).send({ message: "Kunne ikke slette ShopItem med id=" + id }));
};
