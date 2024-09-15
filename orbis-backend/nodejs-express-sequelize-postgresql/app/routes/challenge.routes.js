module.exports = (app) => {
  const challenges = require("../controllers/challenge.controller.js");
  const router = require("express").Router();
  // Create a new Challenge
  router.post("/", challenges.create);

  // Retrieve all Challenges
  router.get("/", challenges.findAll);

  // Retrieve a single Challenge by id
  router.get("/:id", challenges.findOne);

  router.get("/refresh/:section", challenges.getRandomChallengeForSection);

  // Delete a Challenge by id
  router.delete("/:id", challenges.delete);

  app.use("/api/challenges", router);
};
