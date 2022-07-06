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

//...
function checkRequiredFieldslogin(req, res, next) {
  const { firstName, lastName, email, password } = req.body;

  const error = {
    message: "Validation error",
    statusCode: 400,
    errors: {}
  }

  if (!firstName) error.errors.firstName = "First Name is required"
  if (!lastName) error.errors.lastName = "Last Name is required"
  if (!email) error.errors.email = "Email is required"
  if (!password) error.errors.password = "Password is required"


  if (!firstName || !lastName || !email || !password) {
    res.statusCode = 400;
    return res.json(error)
  }
  next()
};
// ...
// async function checkUniqueEmailsignup(req, res, next) {

  // try{
  //   let user = await User.signup({ email, username, firstName, lastName, password });
  // } catch(err) {
  //   if(err.name === 'SequelizeUniqueConstraintError') {
  //     const error = Error('User already exists');
  //     error.title = 'User already exists';
  //     error.message = 'User with that email already exists';
  //     error.statusCode = 403;
  //     error.errors = 'User with that email already exists';
  //     return next(error)
  //   } else {
  //     return next(err)
  //   }
  // }
// }
async function checkUniqueEmailsignup(req, res, next) {
  const {email} = req.body;

  if (!email) return next();

  const user = await User.findOne({
    where: {email}
  })

  if (user) {
    return res.json({
      message: "User already exists",
      statusCode: 403,
      errors: "User with that email already exists"
    })
  }
  next()
};
//...
function checkRequiredFieldssignup(req, res, next) {
  const { firstName, lastName, email, password } = req.body;

  const error = {
    message: "Validation error",
    statusCode: 400,
    errors: {}
  }

  if (!firstName) error.errors.firstName = "First Name is required"
  if (!lastName) error.errors.lastName = "Last Name is required"
  if (!email) error.errors.email = "Invalid Email"
  if (!password) error.errors.password = "Password is required"


  if (!firstName || !lastName || !email || !password) {
    res.statusCode = 400;
    return res.json(error)
  }
  next()
};
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
    checkUniqueEmailsignup,
    checkRequiredFieldssignup,
    validateSignup,
    async (req, res) => {
      let { email,  username, firstName, lastName, password } = req.body;

      const user = await User.signup({ email, username, firstName, lastName, password });


      let token = await setTokenCookie(res, user);
      user.dataValues.token = token


      return res.json({
        "id": user.id,
        "firstName": user.firstName,
        'lastName': user.lastName,
        "email": user.email,
        "token" : token
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
    checkRequiredFieldslogin,
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
