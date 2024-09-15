const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
const path = require("path");
// Register a new user
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, username, email, password } =
      req.body;

    const hasedPassword = await bcrypt.hash(password, 10);
    // Define the default profile image path
    const defaultProfileImagePath = path.join("uploads", "defaultProfile.jpg");
    console.log(path.join(__dirname, "uploads"));
    // Create new user with default profile picture
    const user = await User.create({
      firstName,
      lastName,
      dateOfBirth,
      username,
      email,
      password: hasedPassword,
      profileImagePath: defaultProfileImagePath, // Assign default profile picture
    });

    res.status(201).send({ message: "User registered successfully!", user });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Error registering user" });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Received email:", email);

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ message: "User not found." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: "Invalid password." });
    }

    // Log the JWT secret for debugging
    console.log("JWT_SECRET during login:", process.env.JWT_SECRET);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.send({
      message: "Login Successful",
      token: token,
      userID: user.id,
    });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).send({
      message: err.message || "Some error occurred during login.",
    });
  }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      })
    );
};

// Find a single User by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Cannot find User with id=${id}.` });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Error retrieving User with id=" + id })
    );
};

// Update a User by ID
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "User was updated successfully." });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Error updating User with id=" + id })
    );
};

// Delete a User by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "User was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Could not delete User with id=" + id })
    );
};

// Delete all Users
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) =>
      res.send({ message: `${nums} Users were deleted successfully!` })
    )
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      })
    );
};

exports.getUserDetails = async (req, res) => {
  try {
    // Get user ID from the middleware

    const userId = req.userID;

    // Find user by ID
    const user = await User.findByPk(userId, {
      attributes: [
        "id",
        "username",
        "email",
        "firstName",
        "lastName",
        "dateOfBirth",
        "profileImagePath",
      ],
    });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      profileImagePath: user.profileImagePath || "uploads/defaultProfile.jpg",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving user details.",
    });
  }
};

exports.updateProfileImage = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Check if the file is uploaded
    if (req.file) {
      user.profileImagePath = `/uploads/${req.file.filename}`; // Store the new image path
    }

    await user.save();

    res.status(200).send({
      message: "Profile image updated successfully.",
      profileImagePath: user.profileImagePath,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error updating profile image.",
    });
  }
};
