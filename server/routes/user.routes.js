const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.contrroller");

router.get("/ok", (req, res, next) => {
  res.sendStatus(200);
});

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

module.exports = router;
