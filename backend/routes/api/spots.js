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


//get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    res.json(spots)
  })

//get spot by soptId
router.get('/:id', async (req, res, next) => {
    const spots = await Spot.findOne({
        where:{ id: req.params.id},
        attributes:{
            include:[
                [
                    sequelize.fn("COUNT", sequelize.col("Reviews.review")), "numReviews"
                ],
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"
                ]
            ]
        },
        include: [{
            model: Review,
            as: 'reviews',
            attributes: []
          },
          {
            model: Image,
            as: 'images',
            attributes: ['url']
          },
          {
            model: User,
            as: 'Owner',
            attributes: ['id', 'firstName', 'lastName']
          }
        ],
});

    if(!spots.id) {
        const err = Error("Spot couldn't be found");
        err.status = 404;
        err.title = "Spot couldn't be found";
        err.message = "Spot couldn't be found";
        return next(err);
    }
    res.json(spots)
  })

//create spot
router.post(
  '/', restoreUser, requireAuth,
   async (req, res, next) => {
    let { address, city, state, country, lat, lng, name, description, price } = req.body;

    const error = {
      message: "Validation error",
      statusCode: 400,
      errors: {}
    }

    if (!address) error.errors.address = "Address is required."
    if (!city) error.errors.city= "City is required."
    if (!state) error.errors.state = "State is required."
    if (!country) error.errors.country = "Country is required."
    if (!lat) error.errors.lat = "Latitude is not valid."
    if (!lng) error.errors.lng = "Logitude is not valid."
    if (!name || name.length> 50) error.errors.name = "Name must be less than 50 characters."
    if (!description) error.errors.description = "Description is required."
    if (!price) error.errors.price = "Price per day is required."

      if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        res.statusCode = 400;
        return res.json(error)
      }

      const spot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      });

      res.status(201).json(spot);
  })

// edit spot
router.put(
  '/:spotId', restoreUser,
  async (req, res, next) => {
    let { address, city, state, country, lat, lng, name, description, price } = req.body;

    const error = {
      message: "Validation error",
      statusCode: 400,
      errors: {}
    }

    if (!address) error.errors.address = "Address is required."
    if (!city) error.errors.city= "City is required."
    if (!state) error.errors.state = "State is required."
    if (!country) error.errors.country = "Country is required."
    if (!lat) error.errors.lat = "Latitude is not valid."
    if (!lng) error.errors.lng = "Logitude is not valid."
    if (!name || name.length> 50) error.errors.name = "Name must be less than 50 characters."
    if (!description) error.errors.description = "Description is required."
    if (!price) error.errors.price = "Price per day is required."

      if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
        res.statusCode = 400;
        return res.json(error)
      }

    let spotId = req.params.spotId;

    const editSpot = await Spot.findByPk(spotId);

    if(!editSpot) {
      res.status(404).json({message: "Spot couldn't be found",
  statusCode: 404})}
 else {
  editSpot.address = address
  editSpot.city = city
  editSpot.state = state
  editSpot.country = country
  editSpot.lat = lat
  editSpot.lng = lng
  editSpot.name = name
  editSpot.description = description
  editSpot.price = price

  await editSpot.save()
  res.status(200).json(editSpot);
}
})

//delete spot
router.delete(
  '/:spotId', restoreUser, requireAuth,
  async (req, res, next) => {

  let spotId = req.params.spotId;

  const deleteSpot = await Spot.findByPk(spotId);

  if(!deleteSpot) {
    res.status(404).json({message: "Spot couldn't be found",
statusCode: 404})}
    else{
      await deleteSpot.destroy()
      res.status(200).json({message: "Successfully deleted",
statusCode: 200})
    }

  })

//get all reviews by spot id
router.get('/:spotId/reviews',
  requireAuth,
  async (req, res, next) => {
    const spotId = req.params.spotId

    const spotReview = await Spot.findByPk(spotId);

    if(!spotReview) {
      res.status(404).json({message: "Spot couldn't be found",
  statusCode: 404})}
      else{
    const reviews = await Review.findAll({
      where: { spotId: spotId},
      include: [
        {
          model: User,
          // as: 'users',
          attributes:['id', 'firstName', 'lastName']
        },
             {
          model: Image,
          // as: 'images'
          attributes: ['url']
        }
      ]
    })
    res.json({reviews})
  }}
  )

//create a review based on spot Id
router.post(
  '/:spotId/reviews', restoreUser, requireAuth,
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

    const newspotId = req.params.spotId

    const newspotReview = await Spot.findByPk(newspotId);

    if(!newspotReview) {
     return  res.status(404).json({message: "Spot couldn't be found",
  statusCode: 404})}

  const userspotReview = await Review.findAll({
    where: {
      [Op.and]: [
        { userId: req.user.id },
        { spotId: req.params.spotId}
      ]
    }
  })
  if (userspotReview.length >= 1) {
    return res.status(403).json({
      message: "User already has a review for this spot",
      statusCode: 403
    });
  }

      const newReview = await Review.create({
          userId: req.user.id,
          spotId: req.params.spotId,
          review,
          star
        });

        res.status(200).json(newReview)

    })

 //get all bookings for a spot based on spot Id
 router.get('/:spotId/bookings',
 requireAuth,
 async (req, res, next) => {
   const spotId = req.params.spotId

   const spotReview = await Spot.findByPk(spotId);

   if(!spotReview) {
     res.status(404).json({message: "Spot couldn't be found",
 statusCode: 404})}

 if(spotReview.ownerId != req.user.id){
  const notownerBook = await Booking.findAll({

    attributes: ['spotId', "startDate", "endDate"],
    where: {spotId : req.params.spotId}
  })
  res.json(notownerBook)
}
    if(spotReview.ownerId = req.user.id){
      const ownerBook = await Booking.findAll({
        where: {spotId : req.params.spotId},
        include:[
          {
            model: User,

            attributes: ['id', 'firstName', 'lastName']
          }
        ]
      })
      res.json( ownerBook)
    }

 }
 )

 //create a booking based on spot id
 router.post(
  '/:spotId/bookings', restoreUser, requireAuth,
  async (req, res, next) => {

    const newspotId = req.params.spotId

    const newspotBooking = await Spot.findByPk(newspotId);

    if(!newspotBooking) {
     return  res.status(404).json({message: "Spot couldn't be found",
  statusCode: 404})}

  if(newspotBooking.ownerId == req.user.id) {
    return  res.status(401).json({message: "Can't rent spot to the owner",
 statusCode: 401})}

    let {startDate, endDate} = req.body;
    const error = {
      message: "Validation error",
      statusCode: 400,
      errors: {}
    }

    if (!startDate) error.errors.startDate = "Startdate is required."
    if (!endDate) error.errors.endDate= "Enddate is required."
    if( startDate>endDate ) error.errors.startDate = "Startdate must be before enddate."

    if (!startDate || !endDate|| (startDate>endDate)) {
      res.statusCode = 400;
      return res.json(error)
    }

    const conflitBooking = await Booking.findAll({
      where:{
        // [Op.or]: [ {
        [Op.and]: [
      {startDate: req.body.startDate},
      { spotId: req.params.spotId}
        ]},
        // {[Op.and]: [
        //   {endDate: req.body.endDate},
        //   { spotId: req.params.spotId}
        //     ]}
        //   ]
    // }
  })
      if(!conflitBooking.id) {
        const booking =  await Booking.create({
          userId: req.user.id,
          spotId: req.params.spotId,
          startDate,
          endDate
        });

        res.status(200).json(booking)
      }
      else {
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      "errors": {
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"}
    });
  }
})

//add image base on spot id
router.post(
  '/:spotId/images', restoreUser,  requireAuth,
  async (req, res, next) => {
    const newspotId = req.params.spotId

    const newspotImage = await Spot.findByPk(newspotId);

    if(!newspotImage) {
     return  res.status(404).json({message: "Spot couldn't be found",
  statusCode: 404})}

      if(req.user.id != newspotImage.ownerId) {
        return  res.status(401).json({message: "Unauthorized",
  statusCode: 401})
      }
      const {url} = req.body;

      if(!url) {
        res.status(400).json({
          message: "Validation error",
          statusCode: 400,
          errors: "Url is required"
        })

      }
      const newImage = await Image.create({

        imageableId: req.params.spotId,
        imageableType: "Spot",
        url
      });

      res.status(200).json(newImage)
  })

module.exports = router;
