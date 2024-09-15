const multer = require("multer");
const path = require("path");

module.exports = (app) => {
  console.log("Route file loaded");
  const users = require("../controllers/user.controller.js");
  const router = require("express").Router();
  const { getUserDetails } = require("../controllers/user.controller");
  const verifyToken = require("../middelware/authJWT.js");

  // Set up multer for file storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // The folder where images will be stored
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate unique filename
    },
  });

  const upload = multer({ storage: storage });

  // Register a new user
  router.post("/register", users.register);

  // Login a user
  router.post("/login", users.login);

  // Retrieve user details using token
  router.get("/un", verifyToken, getUserDetails);

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve a single user by ID
  router.get("/:id", users.findOne);

  // Update a user's profile details
  router.put("/:id", users.update);

  // **Upload and update the profile image for a user**
  router.put(
    "/:id/uploads",
    verifyToken,
    upload.single("profileImage"),
    users.updateProfileImage
  );

  // Delete a user by ID
  router.delete("/:id", users.delete);

  // Delete all users
  router.delete("/", users.deleteAll);

  app.use("/api/users", router);
};
