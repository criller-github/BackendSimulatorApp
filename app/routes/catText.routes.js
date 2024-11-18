module.exports = app => {
    const catTexts = require("../controllers/catText.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", catTexts.create);
  
    // Retrieve all Tutorials
    router.get("/", catTexts.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", catTexts.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", catTexts.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", catTexts.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", catTexts.delete);
  
    // Create a new Tutorial
    router.delete("/", catTexts.deleteAll);
  
    app.use('/api/catTexts', router);
  };