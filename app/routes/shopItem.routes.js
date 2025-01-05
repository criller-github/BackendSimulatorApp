module.exports = (app) => {
    const shopitems = require("../controllers/shopItem.controller.js");
    var router = require("express").Router();
   
    router.post("/", shopitems.create);
    router.get("/", shopitems.findAll);
    router.get("/:id", shopitems.findOne);
    router.put("/:id", shopitems.update);
    router.delete("/:id", shopitems.delete);
  
    app.use('/api/shopitems', router);
  };
  