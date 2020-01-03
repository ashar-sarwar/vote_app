const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/keys");

module.exports = (req, res, next) => {
  if (req.headers["authorization"]) {
      console.log("middleware")
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        next(new Error("failed to authenticate token"));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next(new Error("No token provided"));
  }
};
