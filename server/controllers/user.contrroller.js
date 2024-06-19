const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model.js");

const validate = require("../middleware/validate.js");
const userValidate = require("../schema/user.schema.js");

exports.createUser = (req, res, next) => {
  const error = validate(userValidate, req, res);
  if (error) return res.status(400).send(error);

  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Invaild authentication creadetials!",
        });
      });
  });
};

exports.userLogin = (req, res, next) => {
  const email = req.body.email;
  let userId;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) throw { message: "Auth failed 1" };
      userId = user._id;

      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) return res.status(401).json({ message: "Auth failed 2" });

      const token = jwt.sign(
        { email: email, userId: userId },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token: token, expiresIn: 3600, userId: userId });
    })
    .catch((error) => {
      let messageError = "Invaild authentication creadetials!";
      if (error.message) messageError = error.message;

      res.status(401).json({ message: messageError });
    });
};
