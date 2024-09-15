module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "mateisahistul",
  DB: "testdb2",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
