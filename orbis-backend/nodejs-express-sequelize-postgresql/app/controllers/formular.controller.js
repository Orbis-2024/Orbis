const db = require("../models");
const Formular = db.formular;

exports.submitResponse = (req, res) => {
  const { userID, responses } = req.body;

  const responseEntries = responses.map((r) => ({
    userID: userID,
    questionID: r.questionID,
    answer: r.answer,
    date: new Date(),
  }));

  Formular.bulkCreate(responseEntries)
    .then(() =>
      res.status(201).send({ message: "Responses submitted successfully." })
    )
    .catch((err) =>
      res.status(500).send({
        message:
          err.message || "Some error occurred while submitting the responses.",
      })
    );
};
