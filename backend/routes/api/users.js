// backend/routes/api/users.js
const express = require('express');
const { restoreUser } = require('../../utils/auth');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Review, Booking, Image, sequelize } = require('../../db/models');

// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { token } = require('morgan');
// ...

const router = express.Router();

//...
function checkRequiredFieldslogin(req, res, next) {
  const { email, password } = req.body;

  const error = {
    message: "Validation error",
    statusCode: 400,
    errors: {}
  }


  if (!email) error.errors.email = "Email is required"
  if (!password) error.errors.password = "Password is required"


  if (!email || !password) {
    res.statusCode = 400;
    return res.json(error)
  }
  next()
};
// ...

async function checkUniqueEmailsignup(req, res, next) {
  const { email } = req.body;

  if (!email) return next();

  const user = await User.findOne({
    where: { email }
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
  // check('username')
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 4 })
  //   .withMessage('Please provide a username with at least 4 characters.'),
  // check('username')
  //   .not()
  //   .isEmail()
  //   .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/signup',

  async (req, res, next) => {
    let { email, firstName, lastName, password } = req.body;

    const error = {
      message: "Validation error",
      statusCode: 400,
      errors: {}
    }

    if (!email) error.errors.email = "Invalid Email"
    if (!firstName) error.errors.firstname = "First Name is required."
    if (!lastName) error.errors.lastname = "Last Name is required."


    if (!email || !lastName || !firstName) {
      res.statusCode = 400;
      return res.json(error)
    }

    const uniqueEmail = await User.findOne({
      where: { email: req.body.email },
    })

    if (uniqueEmail) {

      res.status(403).json({
        message: "User already exists",
        statusCode: 403,
        errors: {
          "email": "User with that email already exists"
        }

      })
    }


    const user = await User.signup({ email, firstName, lastName, password });


    let token = await setTokenCookie(res, user);
    user.dataValues.token = token
    if (user) {

      return res.json({
        "id": user.id,
        "firstName": user.firstName,
        'lastName': user.lastName,
        "email": user.email,
        "token": token
      });
    } else {
      let err = new Error('Invalid credentials');
      err.status = 401;
      err.title = 'Invalid credentials';
      err.errors = ['Invalid credentials'];
      return next(err);
    }
  }
);

const validateLogin = [
  check('email')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];
// Log in
router.post(
  '/login',

  async (req, res, next) => {
    const { email, password } = req.body;

    const error = {
      message: "Validation error",
      statusCode: 400,
      errors: {}
    }

    if (!email) error.errors.email = "Email is required"
    if (!password) error.errors.password = "Password is required"


    if (!email || !password) {
      res.statusCode = 400;
      return res.json(error)
    }

    const user = await User.login({ email, password });

    if (!user) {
      // const err = new Error('Invalid credentials');
      // err.status = 401;
      // err.title = 'Invalid credentials';
      // err.errors = ['Invalid credentials'];
      // return next(err);
      res.status(401).json({
        message: "Invalid credentials",
        statusCode: 401
      })
    }

    let token = await setTokenCookie(res, user);
    user.dataValues.token = token


    return res.json(
      {
        "id": user.id,
        "firstName": user.firstName,
        'lastName': user.lastName,
        "email": user.email,
        "token": token
      }
    );
  }
);
//get the current user
router.get(
  '/current',
  restoreUser,
  requireAuth,
  async (req, res) => {
    const { user } = req;

    // if (user) {

    // let token = await setTokenCookie(res, user);
    // user.dataValues.token = token

    return res.json(
      {
        "id": user.id,
        "firstName": user.firstName,
        'lastName': user.lastName,
        "email": user.email,
        // "token":token
      }
    )
    // } else return res.json({});
  }
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

//current user spots

router.get('/current/spots',
  restoreUser,
  requireAuth,
  async (req, res) => {
    const  userId  = req.user.id;

    const spots = await Spot.findAll({
      where: { ownerId: userId }
    })

    res.json(spots)
    // }
  })

//current user reviews
router.get('/current/reviews',
  restoreUser,
  requireAuth,
  async (req, res) => {
    const { user } = req;

    const reviews = await Review.findAll({
      where: { userId: user.id },
      include: [
        {
          model: User,

          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: Spot,

          attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
        },
        {
          model: Image,

          attributes: ['url']
        }
      ]
    })
    res.json({ reviews })
  })

//current user bookings
router.get('/current/bookings',
  restoreUser,
  requireAuth,
  async (req, res) => {
    const { user } = req;

    const bookings = await Booking.findAll({
      where: { userId: user.id },
      include: [
        {
          model: Spot,

          attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', "previewImage"]
        }
      ]
    })
    res.json({ "Bookings": bookings })
  })

module.exports = router;
