const express = require('express');
const { restoreUser } = require('../../utils/auth');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Review, Booking, Image, sequelize } = require('../../db/models');
const user = require('../../db/models/user');
const { Op } = require('sequelize');
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...

const router = express.Router();

//get all reviews
router.get('/', async (req, res) => {
    const reviews = await Review.findAll()
    res.json(reviews)
  })

//edit a review
router.put(
    '/:reviewId', restoreUser, requireAuth,
    async (req, res, next) => {
        let {review, star} = req.body;

        const error = {
            message: "Validation error",
            statusCode: 400,
            errors: {}
          }

          if (!review) error.errors.review = "Review text is required"
          if (!star || star>5 || star <1) error.errors.star= "Stars must be an integer from 1 to 5"

          if (!review || !star || star>5 || star <1) {
            res.statusCode = 400;
            return res.json(error)
          }

          const newreviewId = req.params.reviewId

          const newReview = await Review.findByPk(newreviewId);

          if(!newReview) {
           return  res.status(404).json({message: "Review couldn't be found",
        statusCode: 404})}

        newReview.review =review
        newReview.stars = star

        await newReview.save()
        res.status(200).json(newReview)
    })

//delete review
router.delete(
    '/:reviewId', restoreUser, requireAuth,
    async (req, res, next) => {

    let reviewId = req.params.reviewId;

  const deleteReview = await Review.findByPk(reviewId);

  if(!deleteReview) {
    res.status(404).json({message: "Review couldn't be found",
statusCode: 404})}

    await deleteReview.destroy()
    res.status(200).json({message: "Successfully deleted",
statusCode: 200})

    })
module.exports = router;
