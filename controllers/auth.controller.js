const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.send({
        status: 422,
        message: "Username, email and passwors are mandatory!",
      });
    }
    const user = new User({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 16),
    });
    user.save((err, user) => {
      const userId = user?.id;
      const username = user?.username;
      if (err) {
        res.send({ status: 500, message: err });
        return;
      }
      var token = jwt.sign({ id: userId }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      req.session.token = token;
      res.status(200).send({
        userId,
        username,
        token,
        message: "User was registered successfully!",
      });
    });
  } catch (error) {
    console.error("Signup Error -> ", error);
  }
};

exports.signin = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        status: 404,
        message: "Please enter email and password.",
      });
    }
    User.findOne({
      email: email,
    }).exec((err, user) => {
      if (err) {
        res.send({ status: 401, message: err });
        return;
      }
      if (!user) {
        return res.send({
          status: 400,
          message: "Email or password are incorrect.",
        });
      }

      var passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.send({
          status: 401,
          message: "Email or password are incorrect.",
        });
      }
      console.log(user);
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user?.username,
        email: user?.email,
        token: token,
      });
    });
  } catch (err) {
    return res.send({ status: 401, message: err });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
