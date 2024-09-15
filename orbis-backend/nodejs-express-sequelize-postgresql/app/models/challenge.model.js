module.exports = (sequelize, Sequelize) => {
  const Challenge = sequelize.define(
    "challenge",
    {
      resource_saving: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      waste_recycling: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      food_consumption: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      movement: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return Challenge;
};
