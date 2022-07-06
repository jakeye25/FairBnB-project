// backend/routes/api/users.js
const express = require('express');
const { restoreUser } = require('../../utils/auth');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { token } = require('morgan');
// ...

const router = express.Router();

// ...
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// Sign up
router.post(
    '/signup',
    validateSignup,
    async (req, res) => {
      const { email,  username, firstName, lastName, password } = req.body;
      const user = await User.signup({ email, username, firstName, lastName, password });

      await setTokenCookie(res, user);
      firstName = user.firstName;
      id= user.id;
      lastName=user.lastName;
      email = user.email;
      return res.json({
        "id": id,
        "firstName": firstName,
        'lastName': lastName,
        "email":email
      });
    }
  );

  const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];
// Log in
router.post(
    '/login',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.title = 'Invalid credentials';
        err.errors = ['Invalid credentials'];
        return next(err);
      }

      await setTokenCookie(res, user);
      firstName = user.firstName;
      id= user.id;
      lastName=user.lastName;
      email = user.email;

      return res.json({
        "id": id,
        "firstName": firstName,
        'lastName': lastName,
        "email":email,
         "token": user.token
      });
    }
  );
//get the current user
  router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      firstName = user.firstName;
      id= user.id;
      lastName=user.lastName;
      email = user.email;
      if (user) {
        return res.json({
          "id": id,
          "firstName": firstName,
          'lastName': lastName,
          "email":email,
          "token":user.token
        });
      } else return res.json({});
    }
  );

module.exports = router;
