const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import and define models
db.users = require("./user.model.js")(sequelize, Sequelize);
db.formular = require("./formular.model.js")(sequelize, Sequelize);
db.challenge = require("./challenge.model.js")(sequelize, Sequelize);
// Add more models here if needed

module.exports = db;
