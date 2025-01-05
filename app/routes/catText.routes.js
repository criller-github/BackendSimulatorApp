//her definerer vi API-endpoints, der matcher vores CRUD-funktioner i controlleren

//Eksporterer en funktion, der tager app (Express-applikationen) som parameter. 
//Dette giver os mulighed for at tilføje vores API-endpoints til Express-appen
module.exports = (app) => {
 
    //Importerer controlleren, der indeholder de faktiske implementeringer af CRUD-logikken
    const cattexts = require("../controllers/catText.controller.js");
  
    // Initialiserer en ny Router fra Express. Denne router bruges til at definere ruter, der håndterer HTTP-forespørgsler
    var router = require("express").Router();
  
    // Definerer en POST-endpoint under /api/cattexts/
    // Bruges til at oprette en ny CatText ved at kalde create-funktionen fra controlleren
    router.post("/", cattexts.create);
  
    // Definerer en GET-endpoint under /api/cattexts/
    //Bruges til at hente alle CatTexts ved at kalde findAll-funktionen fra controlleren
    router.get("/", cattexts.findAll);
  
    //Definerer en GET-endpoint under /api/cattexts/:id
    //Bruges til at hente en enkelt CatText baseret på dens ID
    // :id repræsenterer en dynamisk parameter, som klienten sender i URL'en
    router.get("/:id", cattexts.findOne);
  
    // Definerer en PUT-endpoint under /api/cattexts/:id
    //Bruges til at opdatere en eksisterende CatText baseret på dens ID
    router.put("/:id", cattexts.update);
  
    //Definerer en DELETE-endpoint under /api/cattexts/:id
    //Bruges til at slette en specifik CatText baseret på dens ID
    router.delete("/:id", cattexts.delete);
  
    // Definerer en DELETE-endpoint under /api/cattexts/
    //Bruges til at slette alle CatTexts
    // vi bruger den ikke
    router.delete("/", cattexts.deleteAll);
  
    // Tilføjer routeren til Express-applikationen og gør alle ruterne tilgængelige under /api/cattexts
    //fx betyder det, at en forespørgsel til http://localhost:8080/api/cattexts vil blive håndteret af denne router
    app.use('/api/cattexts', router);
  };