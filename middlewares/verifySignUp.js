const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  try {
    // Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.send({ status: 500, message: err });
        return;
      }

      if (user) {
        res.send({ status: 400, message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  } catch (error) {
    console.error("Check duplicate username error -> ", error);
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
