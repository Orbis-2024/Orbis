const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  console.log("JWT_SECRET in middleware:", config.secret);
  if (!token) {
    return req.status(403).send({
      message: "No token provided!",
    });
  }

  token = token.replace("Bearer ", "");

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: "Unautharized!",
      });
    }
    req.userID = decoded.id;
    next();
  });
};

module.exports = verifyToken;
