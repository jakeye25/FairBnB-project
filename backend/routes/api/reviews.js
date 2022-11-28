const express = require('express');
const { restoreUser } = require('../../utils/auth');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Review, Booking, Image, sequelize } = require('../../db/models');
const user = require('../../db/models/user');
const review = require('../../db/models/review');
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
        let {review, stars} = req.body;

        const newreviewId = req.params.reviewId

        const newReview = await Review.findByPk(newreviewId);

        if(!newReview) {
         return  res.status(404).json({message: "Review couldn't be found",
      statusCode: 404})}

      if(newReview.userId != req.user.id){
        res.status(403).json({message: "Forbidden",
    statusCode: 403})
    }

        const error = {
            message: "Validation error",
            statusCode: 400,
            errors: {}
          }

          if (!review) error.errors.review = "Review text is required"
          if (review.length<20) error.errors.review = "Review text must be more than 20 characters"
          if (!stars || stars>5 || stars <1) error.errors.stars= "Stars must be an integer from 1 to 5"

          if (!review || !stars || stars>5 || stars <1 || review.length<20) {
            res.statusCode = 400;
            return res.json(error)
          }



        newReview.review =review
        newReview.stars = stars

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

if(deleteReview.userId != req.user.id){
    res.status(403).json({message: "Forbidden",
statusCode: 403})
}

    await deleteReview.destroy()
    res.status(200).json({message: "Successfully deleted",
statusCode: 200})

    })

//add image base on review id
router.post(
    '/:reviewId/images', restoreUser,  requireAuth,
    async (req, res, next) => {
      const newreviewId = req.params.reviewId

      const newreviewImage = await Review.findByPk(newreviewId);

      if(!newreviewImage) {
       return  res.status(404).json({message: "Review couldn't be found",
    statusCode: 404})}


        if(req.user.id != newreviewImage.userId) {
          return  res.status(403).json({message: "Forbidden",
    statusCode: 403})
        }
        const {url} = req.body;

        if(!url) {
          res.status(402).json({
            message: "Validation error",
            statusCode: 402,
            errors: "Url is required"
          })
        }

        let newImage = await Image.create({

          imageableId: req.params.reviewId,
          imageableType: "Review",
          reviewId: req.params.reviewId,
          url
        });

        newImage = newImage.toJSON()
        delete newImage['spotId']
        delete newImage['reviewId']
        delete newImage['createdAt']
        delete newImage['updatedAt']

        let imgCount = await Image.findAll({
            where: {
                [Op.and]: [{
                imageableId: newImage.imageableId
                }, {
                    imageableType: "Review"
                }]
            }
        });

        if(imgCount.length >= 10){
            res.status(400).json({message: "Maximum number of images for this resource was reached",
            statusCode: 400})
        }
        res.status(200).json(newImage)
    })




module.exports = router;
