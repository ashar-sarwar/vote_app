const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { secretKey } = require('../config/keys');



exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const { id, name } = user;
    const token = jwt.sign({id,name},secretKey,)
    res.status(200).json({id,name,token});
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });

    if (!user) {
      throw new Error("invalid username");
    }
    const {id,name}=user
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
const token = jwt.sign({id,name},secretKey,)
      res.status(200).json({ id, name,token });
    } else {
      throw new Error("invalid password");
    }
  } catch (err) {
    next(err);
  }
};
