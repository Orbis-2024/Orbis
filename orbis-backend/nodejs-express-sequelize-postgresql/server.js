require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
// Creat the app express
const app = express();

// Configure middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("Uploads Directory:", path.join(__dirname, "uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/test-path", (req, res) => {
  const fullPath = path.join(__dirname, "uploads", "defaultProfile.jpg");
  res.send(fullPath); // Output the absolute path to the image
});
app.use("/uploads", (req, res, next) => {
  const filePath = path.join(__dirname, "uploads", req.path);
  if (fs.existsSync(filePath)) {
    next(); // File exists, serve it
  } else {
    res.status(404).send("File Not Found");
  }
});

console.log(path.join(__dirname, "uploads"));

// Database configuration
const db = require("./app/models");

// Sync database
db.sequelize.sync();

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// Routes
require("./app/routes/user.routes.js")(app);
require("./app/routes/formular.routes.js")(app);
require("./app/routes/challenge.routes.js")(app);
// Set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
