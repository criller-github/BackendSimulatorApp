module.exports = app => {
    const catTexts = require("../controllers/catText.controller.js");
  
    var router = require("express").Router();
  
    // Create a new catText
    router.post("/", catTexts.create);
  
    // Retrieve all catTexts
    router.get("/", catTexts.findAll);
  
    // Retrieve a single catText with id
    router.get("/:id", catTexts.findOne);
  
    // Update a catText with id
    router.put("/:id", catTexts.update);
  
    // Delete a cattet with id
    router.delete("/:id", catTexts.delete);
  
    // Create a new cattext
    router.delete("/", catTexts.deleteAll);
  
    app.use('/api/catTexts', router);
  };