module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    //YYYY-MM-DD
    dateOfBirth: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    profileImagePath: {
      type: Sequelize.STRING,
      defaultValue: "../uploads/defaultProfile.jpg",
    },
  });

  return User;
};
