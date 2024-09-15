module.exports = (sequelize, Sequelize) => {
  const Formular = sequelize.define("formular", {
    userID: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false, // Corrected typo
    },
    questionID: {
      type: Sequelize.INTEGER,
      allowNull: false, // Corrected typo
    },
    answer: {
      type: Sequelize.STRING,
      allowNull: false, // Corrected typo
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false, // Corrected typo
    },
  });

  return Formular;
};
