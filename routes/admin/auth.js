const express = require("express");
const { check, validationResult } = require("express-validator");
const usersRepo = require("../../repositories/user");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const { requireEmail, requirePassword, requirePasswordConfirmation, requireEmailExist, requireValidPasswordForUser } = require('./validator')

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  "/signup",
  [
    requireEmail,
    requirePassword,
    requirePasswordConfirmation
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(signupTemplate({ req, errors }))
    }

    const { email, password, passwordConfirmation } = req.body;

    const user = await usersRepo.create({ email, password });
    req.session.userId = user.id;

    res.send("Post recieved!");
  }
);

router.post("/signin", [
    requireEmailExist,
    requireValidPasswordForUser
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(signinTemplate({ errors }))
    }

  const { email } = req.body;

  const user = await usersRepo.getOneBy({ email });
 
  req.session.userId = user.id;

  res.send("You are logged in!");
});

module.exports = router;
