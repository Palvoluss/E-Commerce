const { check } = require('express-validator');
const usersRepo = require('../../repositories/user');

module.exports = {
    requireTitle: check('title').trim().isLength({ min:5, max: 40 }).withMessage("Must be beteewn 5 and 40 chars"),
    requirePrice: check('price').trim().toFloat().isFloat({ min:1 }).withMessage("Must be a number with 2 floats"),
    requireEmail:check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Must Be a Valid Email")
      .custom(async (email) => {
        const exixtingUser = await usersRepo.getOneBy({ email });
        if (exixtingUser) {
          throw new Error("Email in use");
        }
      }),
      requirePassword:check("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Must be beteewn 4 and 20 chars"),
      requirePasswordConfirmation:check("passwordConfirmation")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Must be beteewn 4 and 20 chars")
      .custom((passwordConfirmation, { req }) => {
        if (passwordConfirmation !== req.body.password) {
          throw new Error("Passwords must match");
        }
      }),
      requireEmailExist:check('email').trim().normalizeEmail().isEmail().withMessage('Must provide a valid Email').custom(async (email) => {
        const user = await usersRepo.getOneBy({ email });
        if (!user) {
            throw new Error('Email not found!')
        }
    }),
    requireValidPasswordForUser: check('password').trim().custom(async (password, { req }) => {
        const user = await usersRepo.getOneBy({ email: req.body.email })
        if (!user) {
            throw new Error('Invalid Password')
        }
        const validPassword = await usersRepo.comparePassword(
            user.password,
            password
          );
          if (!validPassword) {
            return res.send("Invalid password");
          }
    })
}