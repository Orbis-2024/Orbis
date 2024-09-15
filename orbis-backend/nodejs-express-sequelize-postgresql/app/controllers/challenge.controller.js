const db = require("../models");
const Challenge = db.challenge;

// Create a new challenge
exports.create = (req, res) => {
  const challengeData = {
    resource_saving: req.body.resource_saving,
    waste_recycling: req.body.waste_recycling,
    food_consumption: req.body.food_consumption,
    movement: req.body.movement,
  };

  // Save challenge in the database
  Challenge.create(challengeData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Challenge.",
      });
    });
};

// Retrieve all challenges
exports.findAll = (req, res) => {
  Challenge.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving challenges.",
      });
    });
};

// Retrieve a single challenge by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Challenge.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Challenge with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Challenge with id=" + id,
      });
    });
};

// Delete a challenge
exports.delete = (req, res) => {
  const id = req.params.id;

  Challenge.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Challenge was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Challenge with id=${id}. Maybe Challenge was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Challenge with id=" + id,
      });
    });
};

exports.getRandomChallengeForSection = async (req, res) => {
  const section = req.params.section;

  try {
    // Check if section is valid
    const validSections = [
      "resource_saving",
      "waste_recycling",
      "food_consumption",
      "movement",
    ];
    if (!validSections.includes(section)) {
      return res.status(400).json({ message: "Invalid section" });
    }

    // Get a random challenge from the specified section
    const challenge = await Challenge.findOne({
      order: db.sequelize.random(), // Randomize the result
      attributes: [section], // Only fetch the column related to the section
    });

    if (challenge) {
      return res.json({ challenge: challenge[section] });
    } else {
      return res.status(404).json({ message: "No challenge found" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving the challenge",
      error: error.message,
    });
  }
};
