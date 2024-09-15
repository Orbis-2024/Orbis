module.exports = (app) => {
  const responses = require("../controllers/formular.controller.js");

  var router = require("express").Router();

  // Submit responses
  router.post("/", responses.submitResponse);

  app.use("/api/responses", router);
};
