//her definerer vi API-endpoints, der matcher vores CRUD-funktioner i controlleren

module.exports = (app) => {
    const cattexts = require("../controllers/catText.controller.js");
  
    var router = require("express").Router();
  
    // Create a new catText
    router.post("/", cattexts.create);
  
    // Retrieve all catTexts
    router.get("/", cattexts.findAll);
  
    // Retrieve a single catText with id
    router.get("/:id", cattexts.findOne);
  
    // Update a catText with id
    router.put("/:id", cattexts.update);
  
    // Delete a cattet with id
    router.delete("/:id", cattexts.delete);
  
    // Create a new cattext
    router.delete("/", cattexts.deleteAll);
  
    app.use('/api/cattexts', router);
  };